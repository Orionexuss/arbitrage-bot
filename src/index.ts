import { config } from "dotenv";
import { SWAP_QUOTE_LITE_BASE_URL } from "./constants/url";
import buildTx from "./utils/build_tx";
import getData from "./utils/get_data";
import { fetchSwapInstructions } from "./utils/get_jupiter_instructions";
import { sleep } from "./utils/sleep";
import os from "os";
import path from "path";
import fs from "fs";
import { STABLE_COIN } from "./constants/address";
import {
  createKeyPairFromBytes,
  createKeyPairSignerFromBytes,
  getAddressFromPublicKey,
} from "@solana/kit";
config();

const LAMPORTS_PER_SOL = 1000;

async function getRoute(
  tokenA: string,
  tokenB: string,
  amount: number,
  walletAddress: string,
) {
  const { data1: quote1, data2: quote2 } = await getData(
    SWAP_QUOTE_LITE_BASE_URL,
    tokenA,
    tokenB,
    amount,
  );

  const profit = Number(quote2.outAmount) - amount;
  const profitPercent = ((profit / amount) * 100).toFixed(2);

  if (amount >= Number(quote2.outAmount)) {
    console.log("\n" + "=".repeat(60));
    console.log(`  Input Amount:  $${amount.toFixed(2)}`);
    console.log(`  Output Amount: $${Number(quote2.outAmount).toFixed(2)}`);
    console.log(`  Profit:        $${profit.toFixed(2)} (${profitPercent}%)`);
    console.log(`  Status:        SKIPPED - No profit opportunity`);
    return;
  } else {
    console.log("\n" + "=".repeat(60));
    console.log(`  Input Amount:  $${amount.toFixed(2)}`);
    console.log(`  Output Amount: $${Number(quote2.outAmount).toFixed(2)}`);
    console.log(`  Profit:        $${profit.toFixed(2)} (${profitPercent}%)`);
    console.log(`  Status:        EXECUTING ARBITRAGE`);
  }

  const { ix1, ix2 } = await fetchSwapInstructions(
    quote1,
    quote2,
    walletAddress,
  );

  return { ix1, ix2, quote1, quote2 };
}

async function main() {
  const tokenA = STABLE_COIN.usdc; // USDC Mint
  const tokenB = "So11111111111111111111111111111111111111112"; // SOL Mint
  const amount = LAMPORTS_PER_SOL;

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
  console.log("  Amount: $" + amount.toFixed(2));
  console.log(`  Wallet: ${walletAddress}`);
  console.log("  Interval: 15 seconds");

  while (1) {
    try {
      const timestamp = new Date().toLocaleTimeString();
      console.log("=".repeat(60));
      console.log(`\n[${timestamp}] Checking arbitrage opportunity...`);

      getRoute(tokenA, tokenB, amount, walletAddress)
        .then((data) => {
          if (!data) {
            return;
          }
          buildTx(
            data.ix1.swapInstruction.accounts,
            data.ix1.swapInstruction.data,
            signer,
            walletAddress,
          );

          buildTx(
            data.ix2.swapInstruction.accounts,
            data.ix2.swapInstruction.data,
            signer,
            walletAddress,
          );
        })
        .catch((error) => {
          console.error(`\n[ERROR] Failed to get swap route:`, error.message);
        });
    } catch (error) {
      console.error(`\n[ERROR] Main loop error:`, error);
    }
    await sleep(15000);
  }
}

main();
