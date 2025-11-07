import { config } from "dotenv";
import { SWAP_QUOTE_LITE_BASE_URL } from "./constants/url.js";
import buildTx from "./utils/build_tx.js";
import getData from "./utils/get_data.js";
import { fetchSwapInstructions } from "./utils/get_jupiter_instructions.js";

// Load environment variables from .env file
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

  return { ix1, ix2 };
}

async function main() {
  const tokenA = "So11111111111111111111111111111111111111112"; // Example: SOL
  const tokenB = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // Example: USDC

  const connection = await buildTx(1000000, 995000, 50, 0);
  console.log("Connection from buildTx:", connection);

  const amount = LAMPORTS_PER_SOL;

  getRoute(tokenA, tokenB, amount)
    .then((data) => {})
    .catch((error) => {
      console.error("Error getting swap route:", error);
    });

  const base64data = "5RfLl3rjrSoBAAAAXwBkAAEAypo7AAAAAG06WQkAAAAAAAAA";
  const dataBuffer = Buffer.from(base64data, "base64");
}

main();
