# Solana Arbitrage Bot

A TypeScript bot that monitors and executes arbitrage opportunities on Solana using Jupiter aggregator.

## What It Does

Continuously monitors price differences between any token pairs and executes profitable round-trip trades:
1. Swap Token A → Token B
2. Swap Token B → Token A
3. Profit from the price difference

## Problem It Solves

Manual arbitrage is slow and inefficient. This bot:
- Automates opportunity detection
- Executes trades instantly when profit is found
- Skips unprofitable trades automatically
- Runs 24/7 without human intervention

## Prerequisites

- Node.js 18+
- Solana CLI wallet configured at `~/.config/solana/id.json`
- SOL for transaction fees

## Installation

```bash
npm install
```

## Configuration

Edit `src/index.ts` to configure your token pair:
```typescript
const tokenA = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC
const tokenB = "So11111111111111111111111111111111111111112"; // SOL
const amount = 1000; // Trade amount
```

Optional: Create a `.env` file for custom RPC:
```env
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## Usage

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## How It Works

1. **Fetch Quotes**: Gets swap quotes from Jupiter for both directions
2. **Calculate Profit**: Compares input vs final output amounts
3. **Execute**: Only executes if `output > input` (profit detected)
4. **Repeat**: Checks every 15 seconds

## Output Example

```
============================================================
  SOLANA ARBITRAGE BOT
  Monitoring: [Token A] <-> [Token B]
  Amount: $1000.00
  Wallet: 46huY...55cgL
  Interval: 15 seconds
============================================================

[10:30:45 AM] Checking arbitrage opportunity...

============================================================
  Input Amount:  $1000.00
  Output Amount: $1001.25
  Profit:        $1.25 (0.13%)
  Status:        EXECUTING ARBITRAGE
============================================================
  -> Transaction Signature: 5KJ8n...xR2m
```

## Tech Stack

- **Language**: TypeScript
- **Blockchain**: Solana
- **DEX Aggregator**: Jupiter
- **SDK**: @solana/kit
- **Code Generation**: Codama - Generates TypeScript clients from Solana program IDLs

## Development

### Regenerating TypeScript Client

The Jupiter program client is generated from the IDL using Codama:

```bash
npm run generate
```

This reads `src/idl/jupiter_idl.json` and generates typed TypeScript code in `src/generated/`.

## Disclaimer

This bot executes real transactions. Use at your own risk. Always test with small amounts first.
