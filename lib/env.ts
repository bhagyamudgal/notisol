import { SolanaNetwork } from "./types";

// client
export const DEFAULT_SOLANA_NETWORK: SolanaNetwork =
    (process.env.NEXT_PUBLIC_DEFAULT_SOLANA_NETWORK as SolanaNetwork) ||
    "devnet";

export const SOLANA_DEVNET_RPC_URL =
    process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL;
export const SOLANA_MAINNET_RPC_URL =
    process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL;

// server
export const MONGODB_URI = process.env.MONGODB_URI;
