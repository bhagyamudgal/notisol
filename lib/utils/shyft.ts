import axios from "axios";
import { SHYFT_API_KEY } from "../env";
import { Event, SolanaNetwork } from "../types";
import { Keypair, Transaction } from "@solana/web3.js";
import { getSolanaConnection } from "./solana";

const shyftInstance = axios.create({
    baseURL: "https://api.shyft.to",
    headers: {
        "x-api-key": SHYFT_API_KEY,
    },
    validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
    },
});

export const deleteCallback = async ({
    address,
    network,
}: {
    address: string;
    network: SolanaNetwork;
}) => {
    const response = await shyftInstance.delete("/sol/v1/callback/remove", {
        data: { address, network },
    });

    const result = await response.data;

    return result;
};

export const createCallback = async ({
    callbackUrl,
    address,
    events,
    network,
}: {
    callbackUrl: string;
    address: string;
    network: SolanaNetwork;
    events?: Event[];
}) => {
    const data = {
        callback_url: callbackUrl,
        addresses: [address],
        network,
        events,
    };

    const response = await shyftInstance.post("/sol/v1/callback/create", data);

    const result = await response.data;

    return result;
};

export const getTokenInfo = async ({
    tokenAddress,
    network,
}: {
    tokenAddress: string;
    network: SolanaNetwork;
}) => {
    const response = await shyftInstance.get(
        `/sol/v1/token/get_info?network=${network}&token_address=${tokenAddress}`
    );

    const result = await response.data;

    return result;
};

export const getNftInfo = async ({
    nftAddress,
    network,
}: {
    nftAddress: string;
    network: SolanaNetwork;
}) => {
    const response = await shyftInstance.get(
        `/sol/v1/nft/read?network=${network}&token_address=${nftAddress}`
    );

    const result = await response.data;

    return result;
};

export const signEncodedTransaction = async (
    encodedTx: string,
    network: SolanaNetwork
) => {
    const connection = getSolanaConnection(network);

    const signer = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(process.env.WALLET_KEYPAIR!))
    );

    const tx = Transaction.from(Buffer.from(encodedTx, "base64"));

    tx.partialSign(signer);

    const signature = await connection.sendRawTransaction(tx.serialize());

    return signature;
};
