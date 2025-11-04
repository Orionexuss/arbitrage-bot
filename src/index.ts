import { SWAP_QUOTE_LITE_BASE_URL } from "./constants/url.js";
import getData from "./utils/get_data.js";

const LAMPORTS_PER_SOL = 1_000_000_000;

async function getRoute(tokenA: string, tokenB: string, amount: number) {
  let quote1;
  let quote2;
  const response = await getData(
    SWAP_QUOTE_LITE_BASE_URL,
    tokenA,
    tokenB,
    amount,
  );

  quote1 = response.data1;
  quote2 = response.data2;

  return { quote1, quote2 };
}

function main() {
  const tokenA = "So11111111111111111111111111111111111111112"; // Example: SOL
  const tokenB = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // Example: USDC

  const amount = LAMPORTS_PER_SOL;

  getRoute(tokenA, tokenB, amount)
    .then((data) => {
      console.log("Swap Route Data:", data.quote1, data.quote2);
    })
    .catch((error) => {
      console.error("Error getting swap route:", error);
    });
}

main();
