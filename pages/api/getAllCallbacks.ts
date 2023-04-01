import type { NextApiRequest, NextApiResponse } from "next";
import {
    ApiResponseType,
    handleApiAuthError,
    handleApiRouteError,
    handleInvalidRoute,
    successHandler,
} from "@/lib/utils/api";
import { getAllCallbacks } from "@/lib/utils/shyft";
import { APP_SECRET } from "@/lib/env";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseType>
) {
    try {
        if (req.method !== "GET") {
            return handleInvalidRoute(res);
        }

        const { secret } = req.query;

        if (!secret || secret !== APP_SECRET) {
            return handleApiAuthError(res);
        }

        const response = await getAllCallbacks();

        if (!response.success) {
            throw new Error("Error while fetching callbacks!");
        }

        const callbacks = response?.result;

        return res
            .status(200)
            .json(successHandler(callbacks, "Callbacks fetched successfully!"));
    } catch (error) {
        console.error("/getAllCallbacks =>", error);
        return handleApiRouteError(error, res);
    }
}
