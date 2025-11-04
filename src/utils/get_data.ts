import { SLIPPAGE_BPS } from "../constants/url.js";

export default async function getData(
  url: string,
  tokenA: string,
  tokenB: string,
  amount: number,
) {
  const quote = `${url}?inputMint=${tokenA}&outputMint=${tokenB}&amount=${amount}&slippageBps=${SLIPPAGE_BPS}`;
  try {
    const response = await fetch(quote);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
