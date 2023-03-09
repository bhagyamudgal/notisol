import { Event, SolanaNetwork } from "@/lib/types";
import { createCallback } from "@/lib/utils/shyft";
import UserModel, { User } from "../models/users";

export const getUser = async (walletAddress: string) => {
    const user: User | null = await UserModel.findOne({
        wallet: walletAddress,
    });

    return user;
};

export const createUser = async (walletAddress: string) => {
    const user: User = await UserModel.create({ wallet: walletAddress });

    return user;
};

export const subscribeNotificationForUser = async ({
    walletAddress,
    email,
    events,
    network,
}: {
    walletAddress: string;
    email: string;
    events: Event[];
    network: SolanaNetwork;
}) => {
    const response = await createCallback({
        callbackUrl: `https://9339-2401-4900-1c63-b25-e4bb-4296-bc5b-52f3.in.ngrok.io/api/notify/${walletAddress}`,
        address: walletAddress,
        events,
        network,
    });

    if (!response.success) {
        throw new Error("Failed to create callback!");
    }

    const updatedUser = await UserModel.updateOne(
        { wallet: walletAddress },
        { email, events },
        { new: true }
    );

    return updatedUser;
};
