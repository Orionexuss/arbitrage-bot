import {
  address,
  appendTransactionMessageInstructions,
  compileTransaction,
  createSolanaRpc,
  createTransactionMessage,
  getBase64EncodedWireTransaction,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  type Address,
  type TransactionSigner,
} from "@solana/kit";
import { getRouteInstruction } from "../generated";
import { decodeRouteData } from "./jupiter_utils";

export default async function buildTx(
  accounts: any,
  swapInstructionData: string,
  signer: TransactionSigner,
  walletAddress: Address,
) {
  const decodedRouteData = decodeRouteData(swapInstructionData);
  const rpcUrl =
    process.env.ANCHOR_PROVIDER_URL || "https://api.mainnet-beta.solana.com";
  const rpc = createSolanaRpc(rpcUrl);

  const getRouteIx = getRouteInstruction({
    // Account mapping based on Jupiter's expected account order:
    tokenProgram: address(accounts[0].pubkey), // SPL Token program
    userTransferAuthority: signer, // User's signer for token transfers
    userSourceTokenAccount: address(accounts[2].pubkey), // User's source token account
    userDestinationTokenAccount: address(accounts[3].pubkey), // User's destination token account
    destinationMint: address(accounts[5].pubkey), // Destination token mint
    eventAuthority: address(accounts[7].pubkey), // Event logging authority
    program: address(accounts[8].pubkey), // Jupiter program ID

    // Swap parameters:
    routePlan: decodedRouteData.routePlan, // Route plan (empty for simple swaps)
    inAmount: decodedRouteData.inAmount, // Input amount as BigInt
    quotedOutAmount: decodedRouteData.quotedOutAmount, // Expected output amount as BigInt
    slippageBps: decodedRouteData.slippageBps, // Slippage tolerance in basis points
    platformFeeBps: decodedRouteData.platformFeeBps, // Platform fee in basis points
  });

  // Fetch the latest blockhash for transaction freshness
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

  // Create the transaction message with the instruction
  const transactionMessage = createTransactionMessage({
    version: "legacy",
  });

  // Set the fee payer
  const messageWithFeePayer = setTransactionMessageFeePayer(
    walletAddress,
    transactionMessage,
  );

  // Set the transaction's lifetime using the blockhash
  const messageWithLifetime = setTransactionMessageLifetimeUsingBlockhash(
    latestBlockhash,
    messageWithFeePayer,
  );

  // Append the route instruction to the transaction message
  const messageWithInstruction = appendTransactionMessageInstructions(
    [getRouteIx],
    messageWithLifetime,
  );

  const transaction = compileTransaction(messageWithInstruction);

  // Convert transaction to base64
  const transactionBase64 = getBase64EncodedWireTransaction(transaction);

  let signature = await rpc.sendTransaction(transactionBase64, {}).send();

  console.log(`  -> Transaction Signature: ${signature}`);
}
