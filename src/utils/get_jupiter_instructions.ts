import { request } from "undici";
import { JupiterQuoteResponse } from "../types/types";
import { SWAP_INSTRUCTIONS_BASE_URL } from "../constants/url";

const fetchSwapInstructions = async (
  data1: JupiterQuoteResponse,
  data2: JupiterQuoteResponse,
  userPublicKey: string,
): Promise<{ ix1: any; ix2: any }> => {
  const body1 = JSON.stringify({
    quoteResponse: data1,
    wrapAndUnwrapSol: false,
    useSharedAccounts: false,
    userPublicKey,
  });

  const body2 = JSON.stringify({
    quoteResponse: data2,
    wrapAndUnwrapSol: false,
    useSharedAccounts: false,
    userPublicKey,
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const [res1, res2] = await Promise.all([
    request(SWAP_INSTRUCTIONS_BASE_URL, {
      method: "POST",
      headers,
      body: body1,
    }),
    request(SWAP_INSTRUCTIONS_BASE_URL, {
      method: "POST",
      headers,
      body: body2,
    }),
  ]);

  const [ix1, ix2] = await Promise.all([res1.body.json(), res2.body.json()]);

  return { ix1, ix2 }; // Return the results as an object
};

export { fetchSwapInstructions };
