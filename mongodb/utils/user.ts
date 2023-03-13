import { CALLBACK_API_URL } from "@/lib/env";
import { Event, SolanaNetwork } from "@/lib/types";
import { createCallback, deleteCallback } from "@/lib/utils/shyft";
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

export const getEventsNetwork = (network: SolanaNetwork) => {
    return network === "mainnet-beta" ? "mainnet" : "devnet";
};

export const subscribeNotificationForUser = async ({
    user,
    walletAddress,
    email,
    events,
    network,
}: {
    user: User;
    walletAddress: string;
    email: string;
    events: Event[];
    network: SolanaNetwork;
}) => {
    const eventsNetwork = getEventsNetwork(network);

    const newEvents = user.events;

    newEvents[eventsNetwork] = events;

    const response = await createCallback({
        callbackUrl: `${CALLBACK_API_URL}/api/notify?walletAddress=${walletAddress}&network=${network}`,
        address: walletAddress,
        events,
        network,
    });

    if (!response.success) {
        throw new Error("Failed to create callback!");
    }

    const updatedUser = await UserModel.findOneAndUpdate(
        { wallet: walletAddress },
        { email, events: newEvents },
        { new: true }
    );

    // console.log({ response, updatedUser });

    return updatedUser;
};

export const unsubscribeNotificationForUser = async ({
    user,
    walletAddress,
    network,
}: {
    user: User;
    walletAddress: string;
    network: SolanaNetwork;
}) => {
    const eventsNetwork = getEventsNetwork(network);

    const newEvents = user.events;

    newEvents[eventsNetwork] = null;

    const response = await deleteCallback({
        address: walletAddress,
        network,
    });

    if (!response.success) {
        throw new Error("Failed to delete callback!");
    }

    const updatedUser = await UserModel.findOneAndUpdate(
        { wallet: walletAddress },
        { events: newEvents },
        { new: true }
    );

    return updatedUser;
};
