import { SLIPPAGE_BPS } from "../constants/url.js";
import { JupiterQuoteResponse } from "../types/types.js";

export default async function getData(
  url: string,
  tokenA: string,
  tokenB: string,
  amount: number,
): Promise<{ data1: JupiterQuoteResponse; data2: JupiterQuoteResponse }> {
  let data1;
  let data2;

  try {
    const quote = `${url}?inputMint=${tokenA}&outputMint=${tokenB}&amount=${amount}&slippageBps=${SLIPPAGE_BPS}`;
    console.log("Fetching URL:", quote);
    const response = await fetch(quote);
    const data = await response.json();

    data1 = data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }

  try {
    const quote = `${url}?inputMint=${tokenB}&outputMint=${tokenA}&amount=${amount}&slippageBps=${SLIPPAGE_BPS}`;
    const response = await fetch(quote);
    const data = await response.json();

    data2 = data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }

  return { data1, data2 };
}
