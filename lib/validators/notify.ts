import { z } from "zod";

export const notifyApiQuerySchema = z.object({
    walletAddress: z.string().min(44).max(44),
    network: z.literal("devnet").or(z.literal("mainnet-beta")),
});
