import type { NextApiRequest, NextApiResponse } from "next";
import {
    ApiResponseType,
    handleApiAuthError,
    handleApiRouteError,
    handleInvalidRoute,
    successHandler,
} from "@/lib/utils/api";
import checkAuthentication from "@/middlewares/checkAuthentication";
import connectToDatabase from "@/mongodb/connect";
import { createUser, getUser } from "@/mongodb/utils/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseType>
) {
    try {
        if (req.method !== "GET") {
            return handleInvalidRoute(res);
        }

        const walletAddress = await checkAuthentication(req);

        if (!walletAddress) {
            return handleApiAuthError(res);
        }

        await connectToDatabase();

        let user = await getUser(walletAddress);

        if (!user) {
            user = await createUser(walletAddress);
        }

        if (!user) {
            throw new Error("No user found or created!");
        }

        return res
            .status(200)
            .json(successHandler(user, "User fetched successfully!"));
    } catch (error) {
        console.error("/getUser =>", error);
        return handleApiRouteError(error, res);
    }
}
