import {
  address,
  appendTransactionMessageInstructions,
  compileTransaction,
  createKeyPairFromBytes,
  createKeyPairSignerFromBytes,
  createSolanaRpc,
  createTransactionMessage,
  getAddressFromPublicKey,
  getBase64EncodedWireTransaction,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
} from "@solana/kit";
import fs  from "fs";
import os from "os";
import path from "path";
import { getRouteInstruction } from "../generated";
import { decodeRouteData } from "./jupiter_utils";

export default async function buildTx(
  accounts: any,
  swapInstructionData: string,
) {
  const decodedRouteData = decodeRouteData(swapInstructionData);
  const rpc = createSolanaRpc("https://api.mainnet-beta.solana.com");

  // Load the user's Solana keypair from the default CLI location
  const keypairPath = path.join(os.homedir(), ".config", "solana", "id.json");
  const keypairFile = fs.readFileSync(keypairPath);
  const keypairBytes = new Uint8Array(JSON.parse(keypairFile.toString()));

  // Create both keypair and signer instances
  const keypair = await createKeyPairFromBytes(keypairBytes);
  const signer = await createKeyPairSignerFromBytes(keypairBytes);

  const walletAddress = await getAddressFromPublicKey(keypair.publicKey);

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

  // Convert transaction to base64 for simulation
  const transactionBase64 = getBase64EncodedWireTransaction(transaction);

  let simulationResult = await rpc
    .simulateTransaction(transactionBase64, {
      encoding: "base64",
      replaceRecentBlockhash: true, // Use current blockhash automatically
      commitment: "processed", // Use latest mainnet state
      innerInstructions: true, // Get detailed program execution logs
      accounts: {
        encoding: "base64", // Include account data in simulation
        addresses: [
          walletAddress, // Your wallet
          address(accounts[2].pubkey), // Source token account
          address(accounts[3].pubkey), // Destination token account
        ],
      },
    })
    .send();

  // console.log(simulationResult);
}
