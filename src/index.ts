import { config } from "dotenv";
import { SWAP_QUOTE_LITE_BASE_URL } from "./constants/url.js";
import buildTx from "./utils/build_tx.js";
import getData from "./utils/get_data.js";
import { fetchSwapInstructions } from "./utils/get_jupiter_instructions.js";
import { sleep } from "./utils/sleep.js";
import os from "os";
import path from "path";
import fs from "fs";
import { STABLE_COIN } from "./constants/address.js";
import {
  createKeyPairFromBytes,
  createKeyPairSignerFromBytes,
  getAddressFromPublicKey,
} from "@solana/kit";
config();
import { formatTokenAmount } from "./utils/format_token_amount.js";

const USD_AMOUNT = 100;

async function getRoute(
  tokenA: string,
  tokenB: string,
  raw_amount: number,
  walletAddress: string,
) {
  const { data1: quote1, data2: quote2 } = await getData(
    SWAP_QUOTE_LITE_BASE_URL,
    tokenA,
    tokenB,
    raw_amount,
  );

  const profit = Number(quote2.outAmount) - raw_amount;
  const profitPercent = ((profit / raw_amount) * 100).toFixed(2);

  const inputAmount = formatTokenAmount(raw_amount, 6, 2); // Assuming 6 decimals for USDC
  const outputAmount = formatTokenAmount(Number(quote2.outAmount), 6, 2);
  const profitFormatted = formatTokenAmount(profit, 6, 6);


  if (raw_amount>= Number(quote2.outAmount)) {
    console.log(`  Input Amount:  $${inputAmount}`);
    console.log(`  Output Amount: $${outputAmount}`);
    console.log(`  Profit:        $${profitFormatted} (${profitPercent}%)`);
    console.log(`  Status:        SKIPPED - No profit opportunity`);
    return;
  } else {
    console.log(`  Input Amount:  $${inputAmount}`);
    console.log(`  Output Amount: $${outputAmount}`);
    console.log(`  Profit:        $${profitFormatted} (${profitPercent}%)`);
    console.log(`  Status:        EXECUTING ARBITRAGE`);
  }

  const { ix1, ix2 } = await fetchSwapInstructions(
    quote1,
    quote2,
    walletAddress,
  );

  return { ix1, ix2 };
}

async function main() {
  const tokenA = STABLE_COIN.usdc; // USDC Mint
  const tokenB = "So11111111111111111111111111111111111111112"; // SOL Mint
  const amount =  USD_AMOUNT * 1e6; // Convert USD to lamports (6 decimals for USDC)

  // Load keypair once at startup
  const keypairPath = path.join(os.homedir(), ".config", "solana", "id.json");
  const keypairFile = fs.readFileSync(keypairPath);
  const keypairBytes = new Uint8Array(JSON.parse(keypairFile.toString()));
  const keypair = await createKeyPairFromBytes(keypairBytes);
  const signer = await createKeyPairSignerFromBytes(keypairBytes);
  const walletAddress = await getAddressFromPublicKey(keypair.publicKey);

  console.log("\n" + "=".repeat(60));
  console.log("  SOLANA ARBITRAGE BOT");
  console.log(`  Monitoring: ${tokenA} <-> ${tokenB}`);
  console.log("  Amount: $" + amount)
  console.log(`  Wallet: ${walletAddress}`);
  console.log("  Interval: 15 seconds");

  while (1) {
    try {
      const timestamp = new Date().toLocaleTimeString();
      console.log("=".repeat(60));
      console.log(`\n[${timestamp}] Checking arbitrage opportunity...`);
      console.log("\n")

      const data = await getRoute(tokenA, tokenB, amount, walletAddress);
      if (data) {
        // Execute legs in order so leg 2 only runs after leg 1 is submitted.
        await buildTx(data.ix1, signer, walletAddress);
        await buildTx(data.ix2, signer, walletAddress);
      }
    } catch (error) {
      console.error(`\n[ERROR] Main loop error:`, error);
    }
    await sleep(15000);
  }
}

main();
