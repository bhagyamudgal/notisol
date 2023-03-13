import type { NextApiRequest, NextApiResponse } from "next";
import {
    ApiResponseType,
    handleApiAuthError,
    handleApiClientError,
    handleApiRouteError,
    handleInvalidRoute,
    successHandler,
} from "@/lib/utils/api";
import checkAuthentication from "@/middlewares/checkAuthentication";
import connectToDatabase from "@/mongodb/connect";
import { getUser, subscribeNotificationForUser } from "@/mongodb/utils/user";
import { subscribeForNotificationApiBodySchema } from "@/lib/validators/subscribeForNotification";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseType>
) {
    try {
        if (req.method !== "POST") {
            return handleInvalidRoute(res);
        }

        const walletAddress = await checkAuthentication(req);

        if (!walletAddress) {
            return handleApiAuthError(res);
        }

        const bodyValidationResult =
            subscribeForNotificationApiBodySchema.safeParse(req.body);

        if (!bodyValidationResult.success) {
            return handleApiClientError(res);
        }

        const { email, events, network } = bodyValidationResult.data;

        await connectToDatabase();

        let user = await getUser(walletAddress);

        if (!user) {
            return handleApiAuthError(res);
        }

        await subscribeNotificationForUser({
            user,
            walletAddress,
            email,
            events,
            network,
        });

        return res
            .status(200)
            .json(
                successHandler(
                    { walletAddress, email, events },
                    "User successfully subscribed for email notifications!"
                )
            );
    } catch (error) {
        console.error("/subscribeForNotification =>", error);
        return handleApiRouteError(error, res);
    }
}
