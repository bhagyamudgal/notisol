import { atom } from "recoil";
import { DEFAULT_SOLANA_NETWORK } from "@/lib/env";
import { SolanaNetwork } from "@/lib/types";

export const solanaNetworkState = atom<SolanaNetwork>({
    key: "solana-network",
    default: DEFAULT_SOLANA_NETWORK,
});
