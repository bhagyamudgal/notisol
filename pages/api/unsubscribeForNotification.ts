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
import { getUser, unsubscribeNotificationForUser } from "@/mongodb/utils/user";
import { unsubscribeForNotificationApiBodySchema } from "@/lib/validators/subscribeForNotification";

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
            unsubscribeForNotificationApiBodySchema.safeParse(req.body);

        if (!bodyValidationResult.success) {
            return handleApiClientError(res);
        }

        const { network } = bodyValidationResult.data;

        await connectToDatabase();

        let user = await getUser(walletAddress);

        if (!user) {
            return handleApiAuthError(res);
        }

        await unsubscribeNotificationForUser({
            user,
            walletAddress,
            network,
        });

        return res
            .status(200)
            .json(
                successHandler(
                    { walletAddress },
                    "User successfully unsubscribed for email notifications!"
                )
            );
    } catch (error) {
        console.error("/unsubscribeForNotification =>", error);
        return handleApiRouteError(error, res);
    }
}
