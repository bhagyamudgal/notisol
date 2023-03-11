export type SolanaNetwork = "mainnet-beta" | "devnet";

export enum Event {
    NFT_MINT = "NFT_MINT",
    TOKEN_MINT = "TOKEN_MINT",
    TOKEN_CREATE = "TOKEN_CREATE",
    SOL_TRANSFER = "SOL_TRANSFER",
    TOKEN_TRANSFER = "TOKEN_TRANSFER",
    NFT_TRANSFER = "NFT_TRANSFER",
    NFT_BURN = "NFT_BURN",
    TOKEN_BURN = "TOKEN_BURN",
    NFT_SALE = "NFT_SALE",
    NFT_BID = "NFT_BID",
    NFT_LIST = "NFT_LIST",
    NFT_LIST_CANCEL = "NFT_LIST_CANCEL",
    MARKETPLACE_WITHDRAW = "MARKETPLACE_WITHDRAW",
}

export type Transaction = {
    timestamp: string;
    fee: number;
    signature: string;
    type: Event;
    info: any;
};
