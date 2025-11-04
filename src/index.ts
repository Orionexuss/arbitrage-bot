import { SWAP_QUOTE_LITE_BASE_URL } from "./constants/url.js";
import getData from "./utils/get_data.js";

function getRoute(tokenA: string, tokenB: string, amount: number) {
  const response = getData(SWAP_QUOTE_LITE_BASE_URL, tokenA, tokenB, amount);
  return response;
}

function main() {
  const tokenA = "So11111111111111111111111111111111111111112"; // Example: SOL
  const tokenB = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // Example: USDC
  const amount = 1000000; // Example: 1 SOL in lamports

  getRoute(tokenA, tokenB, amount)
    .then((data) => {
      console.log("Swap Route Data:", data);
    })
    .catch((error) => {
      console.error("Error getting swap route:", error);
    });
}

main();
