export type JupiterQuoteResponse = {
  mode: string;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  inUsdValue: number;
  outUsdValue: number;
  priceImpact: number;
  swapUsdValue: number;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  priceImpactPct: string;
  routePlan: {
    swapInfo: {
      ammKey: string;
      label: string;
      inputMint: string;
      outputMint: string;
      inAmount: string;
      outAmount: string;
      feeAmount: string;
      feeMint: string;
    };
    percent: number;
    bps: number;
  }[];
  feeMint: string;
  feeBps: number;
  platformFee: {
    amount: string;
    feeBps: number;
  };
  signatureFeeLamports: number;
  signatureFeePayer: string;
  prioritizationFeeLamports: number;
  prioritizationFeePayer: string;
  rentFeeLamports: number;
  rentFeePayer: string;
  swapType: string;
  router: string;
  transaction: string;
  gasless: boolean;
  requestId: string;
  totalTime: number;
  taker: string;
  quoteId: string;
  maker: string;
  expireAt: string;
  errorCode?: number; // opcional: solo aparece si hay error
  errorMessage?: string; // opcional: solo aparece si hay error
};
