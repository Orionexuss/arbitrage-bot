import {
  createKeyPairFromBytes,
  createKeyPairSignerFromBytes,
  getAddressFromPublicKey,
  TransactionSigner,
} from "@solana/kit";
import fs from "fs";
import os from "os";
import path from "path";
import { connect } from "solana-kite";
import { getRouteInstruction } from "../generated";
import { decodeRouteData } from "./jupiter_utils";

export default async function buildTx(
  in_amount: number,
  quoted_out_amount: number,
  slippage_bps: number,
  platform_fee_bps: number,
  accounts: any,
  swapInstructionData: string,
) {
  const connection = connect("devnet");

  const decodedRouteData = decodeRouteData(swapInstructionData);

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
    tokenProgram: accounts[0], // SPL Token program
    userTransferAuthority: signer, // User's signer for token transfers
    userSourceTokenAccount: accounts[2], // User's source token account
    userDestinationTokenAccount: accounts[3], // User's destination token account
    destinationTokenAccount: accounts[4], // Intermediate destination account
    destinationMint: accounts[5], // Destination token mint
    platformFeeAccount: accounts[6], // Platform fee collection account
    eventAuthority: accounts[7], // Event logging authority
    program: accounts[8], // Jupiter program ID

    // Swap parameters:
    routePlan: decodedRouteData.routePlan, // Route plan (empty for simple swaps)
    inAmount: decodedRouteData.inAmount, // Input amount as BigInt
    quotedOutAmount: decodedRouteData.quotedOutAmount, // Expected output amount as BigInt
    slippageBps: decodedRouteData.slippageBps, // Slippage tolerance in basis points
    platformFeeBps: decodedRouteData.platformFeeBps, // Platform fee in basis points
  });

  console.log("✅ Jupiter route instruction built successfully");
}
