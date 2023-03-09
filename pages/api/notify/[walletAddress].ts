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
    res: NextApiResponse
) {
    try {
        // if (req.method !== "POST") {
        //     return handleInvalidRoute(res);
        // }

        const { walletAddress } = req.query;

        // if (!walletAddress) {
        //     return handleApiClientError(res);
        // }

        console.log(walletAddress, req.body);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log("/notify =>", error);
        return handleApiRouteError(error, res);
    }
}
