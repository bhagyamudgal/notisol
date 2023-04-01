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
    const newCallbackId = user.callbackId;

    newEvents[eventsNetwork] = events;

    const response = await createCallback({
        callbackUrl: `${CALLBACK_API_URL}/api/notify?walletAddress=${walletAddress}&network=${network}`,
        address: walletAddress,
        events,
        network,
    });

    console.log("shyft create callback response =>", response);

    if (!response.success) {
        throw new Error("Failed to create callback!");
    }

    const callbackId = response?.result?.id;

    if (!callbackId) {
        throw new Error(
            "Failed to create callback as no callbackId was found!"
        );
    }

    newCallbackId[eventsNetwork] = callbackId;

    const updatedUser = await UserModel.findOneAndUpdate(
        { wallet: walletAddress },
        { email, events: newEvents, callbackId: newCallbackId },
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
    const newCallbackId = user.callbackId;

    newEvents[eventsNetwork] = null;

    const callbackId = newCallbackId[eventsNetwork];

    if (!callbackId) {
        throw new Error(
            "Failed to delete callback as no callback was register!"
        );
    }

    const response = await deleteCallback(callbackId);

    console.log("shyft delete callback response =>", response);

    if (!response.success) {
        throw new Error("Failed to delete callback!");
    }

    newCallbackId[eventsNetwork] = null;

    const updatedUser = await UserModel.findOneAndUpdate(
        { wallet: walletAddress },
        { events: newEvents, callbackId: newCallbackId },
        { new: true }
    );

    return updatedUser;
};
