import { Connection, clusterApiUrl } from "@solana/web3.js";
import { SOLANA_DEVNET_RPC_URL, SOLANA_MAINNET_RPC_URL } from "../env";
import { SolanaNetwork } from "../types";

export const getSolanaRpcUrl = (network: SolanaNetwork) => {
    if (network === "mainnet-beta") {
        return SOLANA_MAINNET_RPC_URL || clusterApiUrl("mainnet-beta");
    }

    return SOLANA_DEVNET_RPC_URL || clusterApiUrl("devnet");
};

export const getSolanaConnection = (network: SolanaNetwork) => {
    const rpcUrl = getSolanaRpcUrl(network);

    const connection = new Connection(rpcUrl, "confirmed");

    return connection;
};

export const shortenWalletAddress = (address: string) => {
    if (address) {
        return address.slice(0, 4) + "..." + address.slice(-4);
    } else {
        return "---";
    }
};
