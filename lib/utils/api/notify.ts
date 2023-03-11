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

        let tokenInfo = { name: "Unknown", symbol: "Unknown" };

        const result = response.result;

        if (result) {
            tokenInfo = result;
        }

        const isReceiver = receiver === walletAddress;

        let title = null;
        let message = null;

        if (isReceiver) {
            title = `${tokenInfo.name} (${tokenInfo.symbol}) SPL-Token Received`;
            message = `You received ${amount} ${tokenInfo.symbol} from ${sender} on solana ${network}`;
        } else {
            title = `${tokenInfo.name} (${tokenInfo.symbol}) SPL-Token Sent`;
            message = `You sent ${amount} ${tokenInfo.symbol} to ${receiver} on solana ${network}`;
        }

        return { title, message };
    }

    if (transaction.type === Event.NFT_TRANSFER) {
        const receiver = transaction.info.receiver;
        const sender = transaction.info.sender;
        const amount = transaction.info.amount;
        const nftAddress = transaction.info.nft_address;

        const response = await getNftInfo({ nftAddress, network });

        let nftInfo = { name: "Unknown", symbol: "Unknown" };

        const result = response.result;

        if (result) {
            nftInfo = result;
        }

        const isReceiver = receiver === walletAddress;

        let title = null;
        let message = null;

        if (isReceiver) {
            title = `${nftInfo.name} NFT Received`;
            message = `You received ${amount} ${nftInfo.name} from ${sender} on solana ${network}`;
        } else {
            title = `${nftInfo.name} NFT Sent`;
            message = `You sent ${amount} ${nftInfo.name} to ${receiver} on solana ${network}`;
        }

        return { title, message };
    }

    return null;
};
