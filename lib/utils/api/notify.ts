import { Event, SolanaNetwork, Transaction } from "@/lib/types";
import { getNftInfo, getTokenInfo } from "../shyft";

export const getTransactionDescription = async ({
    walletAddress,
    network,
    transaction,
}: {
    walletAddress: string;
    network: SolanaNetwork;
    transaction: Transaction;
}) => {
    if (transaction.type === Event.SOL_TRANSFER) {
        const receiver = transaction.info.receiver;
        const sender = transaction.info.sender;
        const amount = transaction.info.amount;

        const isReceiver = receiver === walletAddress;

        let title = null;
        let message = null;

        if (isReceiver) {
            title = "SOL Received";
            message = `You received ${amount} SOL from ${sender} on solana ${network}`;
        } else {
            title = "SOL Sent";
            message = `You sent ${amount} SOL to ${receiver} on solana ${network}`;
        }

        return { title, message };
    }

    if (transaction.type === Event.TOKEN_TRANSFER) {
        const receiver = transaction.info.receiver;
        const sender = transaction.info.sender;
        const amount = transaction.info.amount;
        const tokenAddress = transaction.info.token_address;

        const response = await getTokenInfo({ tokenAddress, network });

        let tokenInfo = null;

        const result = response.result;

        if (result) {
            tokenInfo = result;
        }

        const isReceiver = receiver === walletAddress;

        let title = null;
        let message = null;

        if (isReceiver) {
            if (tokenInfo) {
                title = `${tokenInfo.name} (${tokenInfo.symbol}) Solana Token Received`;
                message = `You received ${amount} ${tokenInfo.name} (${tokenInfo.symbol}) token from ${sender} on solana ${network}`;
            } else {
                title = `Unknown Solana Token Received`;
                message = `You received ${amount} Unknown token from ${sender} on solana ${network}`;
            }
        } else {
            if (tokenInfo) {
                title = `Unknown Solana NFT Sent`;
                message = `You sent ${amount} ${tokenInfo.name} (${tokenInfo.symbol}) token to ${receiver} on solana ${network}`;
            } else {
                title = `Unknown Solana Token Sent`;
                message = `You sent ${amount} Unknown solana token to ${receiver} on solana ${network}`;
            }
        }

        return { title, message };
    }

    if (transaction.type === Event.NFT_TRANSFER) {
        const receiver = transaction.info.receiver;
        const sender = transaction.info.sender;
        const amount = transaction.info.amount;
        const nftAddress = transaction.info.nft_address;

        const response = await getNftInfo({ nftAddress, network });

        let nftInfo = null;

        const result = response.result;

        if (result) {
            nftInfo = result;
        }

        const isReceiver = receiver === walletAddress;

        let title = null;
        let message = null;

        if (isReceiver) {
            if (nftInfo) {
                title = `${nftInfo.name} NFT Received`;
                message = `You received ${amount} ${nftInfo.name} NFT from ${sender} on solana ${network}`;
            } else {
                title = `Unknown NFT Received`;
                message = `You received Unknown NFT from ${sender} on solana ${network}`;
            }
        } else {
            if (nftInfo) {
                title = `${nftInfo.name} NFT Sent`;
                message = `You sent ${amount} ${nftInfo.name} NFT to ${receiver} on solana ${network}`;
            } else {
                title = `Unknown NFT Sent`;
                message = `You sent Unknown NFT to ${receiver} on solana ${network}`;
            }
        }

        return { title, message };
    }

    return null;
};
