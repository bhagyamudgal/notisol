import { nativeEnum, z } from "zod";
import { Event, SolanaNetwork } from "../types";

export const subscribeForNotificationFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required!" })
        .email({ message: "Please enter a valid email!" }),
    solTransfer: z.boolean(),
    splTokenTransfer: z.boolean(),
    nftTransfer: z.boolean(),
});

export const subscribeForNotificationApiBodySchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required!" })
        .email({ message: "Please enter a valid email!" }),
    events: z.array(z.nativeEnum(Event)),
    network: z.literal("devnet").or(z.literal("mainnet-beta")),
});

export const unsubscribeForNotificationApiBodySchema = z.object({
    network: z.literal("devnet").or(z.literal("mainnet-beta")),
});

export type SubscribeForNotificationForm = z.infer<
    typeof subscribeForNotificationFormSchema
>;

export type SubscribeForNotificationApiBody = z.infer<
    typeof subscribeForNotificationApiBodySchema
>;

export type UnsubscribeForNotificationApiBody = z.infer<
    typeof unsubscribeForNotificationApiBodySchema
>;
