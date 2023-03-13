import { SolanaNetwork } from "./types";

// client
export const DEFAULT_SOLANA_NETWORK: SolanaNetwork =
    (process.env.NEXT_PUBLIC_DEFAULT_SOLANA_NETWORK as SolanaNetwork) ||
    "devnet";

export const SOLANA_DEVNET_RPC_URL =
    process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL;
export const SOLANA_MAINNET_RPC_URL =
    process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL;
export const CALLBACK_API_URL = process.env.NEXT_PUBLIC_CALLBACK_API_URL;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// server
export const MONGODB_URI = process.env.MONGODB_URI;
export const SHYFT_API_KEY = process.env.SHYFT_API_KEY;
export const COURIER_API_KEY = process.env.COURIER_API_KEY;
