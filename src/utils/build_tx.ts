import {
  AccountRole,
  address,
  appendTransactionMessageInstructions,
  compileTransaction,
  createSolanaRpc,
  createTransactionMessage,
  getBase64EncodedWireTransaction,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  upgradeRoleToSigner,
  type AccountMeta,
  type AccountSignerMeta,
  type Address,
  type Instruction,
  type ReadonlyUint8Array,
  type TransactionSigner,
} from "@solana/kit";

type JupiterSwapInstructionAccount = {
  pubkey: string;
  isSigner: boolean;
  isWritable: boolean;
};

type JupiterSwapInstruction = {
  programId: string;
  accounts: JupiterSwapInstructionAccount[];
  data: string;
};

type JupiterSwapInstructionsBundle = {
  computeBudgetInstructions?: JupiterSwapInstruction[];
  setupInstructions?: JupiterSwapInstruction[];
  swapInstruction: JupiterSwapInstruction;
  cleanupInstruction?: JupiterSwapInstruction | null;
  otherInstructions?: JupiterSwapInstruction[];
  addressLookupTableAddresses?: string[];
};

function toKitAccountMeta(
  account: JupiterSwapInstructionAccount,
  signer: TransactionSigner,
): AccountMeta | AccountSignerMeta {
  const baseRole = account.isWritable
    ? AccountRole.WRITABLE
    : AccountRole.READONLY;

  if (account.isSigner) {
    if (account.pubkey !== signer.address) {
      throw new Error(
        `Instruction requires unknown signer: ${account.pubkey}. Expected signer: ${signer.address}`,
      );
    }

    return {
      address: address(account.pubkey),
      role: upgradeRoleToSigner(baseRole),
      signer,
    };
  }

  return {
    address: address(account.pubkey),
    role: baseRole,
  };
}

function toKitInstruction(
  instruction: JupiterSwapInstruction,
  signer: TransactionSigner,
): Instruction<string> & { data: ReadonlyUint8Array } {
  return {
    programAddress: address(instruction.programId),
    accounts: instruction.accounts.map((account) =>
      toKitAccountMeta(account, signer),
    ),
    data: new Uint8Array(Buffer.from(instruction.data, "base64")),
  };
}

export default async function buildTx(
  swapInstructionsBundle: JupiterSwapInstructionsBundle,
  signer: TransactionSigner,
  walletAddress: Address,
) {
  const rpcUrl =
    process.env.ANCHOR_PROVIDER_URL || "https://api.mainnet-beta.solana.com";
  const rpc = createSolanaRpc(rpcUrl);

  const instructions: Array<
    Instruction<string> & { data: ReadonlyUint8Array }
  > = [
      ...(swapInstructionsBundle.computeBudgetInstructions ?? []).map((ix) =>
        toKitInstruction(ix, signer),
      ),
      ...(swapInstructionsBundle.setupInstructions ?? []).map((ix) =>
        toKitInstruction(ix, signer),
      ),
      toKitInstruction(swapInstructionsBundle.swapInstruction, signer),
      ...(swapInstructionsBundle.cleanupInstruction
        ? [toKitInstruction(swapInstructionsBundle.cleanupInstruction, signer)]
        : []),
      ...(swapInstructionsBundle.otherInstructions ?? []).map((ix) =>
        toKitInstruction(ix, signer),
      ),
    ];

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
    instructions,
    messageWithLifetime,
  );

  const transaction = compileTransaction(messageWithInstruction);

  // Convert transaction to base64
  const transactionBase64 = getBase64EncodedWireTransaction(transaction);

  let signature = await rpc
    .sendTransaction(transactionBase64, { encoding: "base64" })
    .send();

  console.log(`  -> Transaction Signature: ${signature}`);
}
