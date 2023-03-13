import type { NextApiRequest, NextApiResponse } from "next";
import {
    handleApiClientError,
    handleApiRouteError,
    handleInvalidRoute,
} from "@/lib/utils/api";
import connectToDatabase from "@/mongodb/connect";
import { getUser } from "@/mongodb/utils/user";
import { getTransactionDescription } from "@/lib/utils/api/notify";
import { notifyApiQuerySchema } from "@/lib/validators/notify";
import { sendEmail } from "@/lib/utils/courier";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "POST") {
            return handleInvalidRoute(res);
        }

        const queryValidationResult = notifyApiQuerySchema.safeParse(req.query);

        if (!queryValidationResult.success) {
            // console.log("/notify =>", "Invalid query params!");
            return handleApiClientError(res);
        }

        const { walletAddress, network } = queryValidationResult.data;

        const body = req.body;

        if (!body) {
            return handleApiClientError(res);
        }

        await connectToDatabase();

        const user = await getUser(walletAddress);

        if (!user) {
            throw new Error("No user found!");
        }

        if (!user.email) {
            throw new Error("No email found for this user!");
        }

        const transaction = {
            timestamp: body.timestamp,
            fee: body.fee,
            signature: body.signatures[0],
            type: body.type,
            info: body.actions[0]?.info,
        };

        // console.log(walletAddress, network, transaction);

        const description = await getTransactionDescription({
            walletAddress,
            network,
            transaction,
        });

        // console.log(description);

        if (!description) {
            throw new Error("No description found for this transaction!");
        }

        const requestId = await sendEmail({
            email: user.email,
            title: description.title,
            body: description.message,
        });

        if (!requestId) {
            throw new Error("Failed to send email!");
        }

        // console.log("Email sent successfully!");

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("/notify =>", error);
        return handleApiRouteError(error, res);
    }
}
