import {
  createSolanaRpc,
  createKeyPairFromBytes,
  getAddressFromPublicKey,
} from "@solana/kit";
import fs from "fs";
import type { Jupiter } from "../idl/jupiter.js";
import idl from "../idl/jupiter_idl.json" with { type: "json" };

export default async function buildTx(
  in_amount: number,
  quoted_out_amount: number,
  slippage_bps: number,
  platform_fee_bps: number,
) {
  const rpcUrl = process.env.ANCHOR_PROVIDER_URL;
  if (!rpcUrl) {
    throw new Error(
      "ANCHOR_PROVIDER_URL is not defined in environment variables.",
    );
  }
  const rpc = createSolanaRpc(rpcUrl);
  const keypairFile = fs.readFileSync("/home/sebastian/.config/solana/id.json");
  const keypairBytes = new Uint8Array(JSON.parse(keypairFile.toString()));
  const { privateKey, publicKey } = await createKeyPairFromBytes(keypairBytes);

  const walletAddress = await getAddressFromPublicKey(publicKey);
  console.log("Wallet Address:", walletAddress);

  return rpc;
}
