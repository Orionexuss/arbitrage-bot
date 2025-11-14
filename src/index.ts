import { config } from "dotenv";
import { SWAP_QUOTE_LITE_BASE_URL } from "./constants/url";
import buildTx from "./utils/build_tx";
import getData from "./utils/get_data";
import { fetchSwapInstructions } from "./utils/get_jupiter_instructions";
config();

const LAMPORTS_PER_SOL = 1_000_000_000;

async function getRoute(tokenA: string, tokenB: string, amount: number) {
  const response = await getData(
    SWAP_QUOTE_LITE_BASE_URL,
    tokenA,
    tokenB,
    amount,
  );

  const quote1 = response.data1;
  const quote2 = response.data2;
  const walletPublicKey = "46huYt5TdfVmeJtDjNYbPG2ihNPEhNpPpJtB9JZ55cgL";

  const { ix1, ix2 } = await fetchSwapInstructions(
    quote1,
    quote2,
    walletPublicKey,
  );

  const rawValue = ix1.swapInstruction.data;
  const bufferValue = Buffer.from(rawValue, "base64");
  console.log(`Buffer Value:`, [...bufferValue]);

  return { ix1, ix2, quote1, quote2 };
}

async function main() {
  const tokenA = "So11111111111111111111111111111111111111112"; // Example: SOL
  const tokenB = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // Example: USDC

  const amount = LAMPORTS_PER_SOL;

  getRoute(tokenA, tokenB, amount)
    .then((data) => {
      console.log(data.ix1.swapInstruction);
      console.log("Successfully got swap route and built transaction!");
      buildTx(
        amount,
        Number(data.quote1.outAmount), // Use the outAmount from quote1
        50, // Example slippage_bps
        0, // Example platform_fee_bps
        data.ix1.swapInstruction.accounts,
        data.ix1.swapInstruction.data, // Pass the instruction data for decoding
      );
    })
    .catch((error) => {
      console.error("Error getting swap route:", error);
    });
}

main();
