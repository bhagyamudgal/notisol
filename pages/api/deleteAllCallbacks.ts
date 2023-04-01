import type { NextApiRequest, NextApiResponse } from "next";
import {
    ApiResponseType,
    handleApiAuthError,
    handleApiRouteError,
    handleInvalidRoute,
    successHandler,
} from "@/lib/utils/api";
import { deleteCallback, getAllCallbacks } from "@/lib/utils/shyft";
import { APP_SECRET } from "@/lib/env";
import { sleep } from "@/lib/utils/general";

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

        const totalCallbacks = callbacks?.length;

        let deletedCallbacks = 0;

        for (const callback of callbacks) {
            await sleep(1500);

            const callbackId = callback._id;

            const response = await deleteCallback(callbackId);

            console.log("Callback delete response =>", response);

            if (!response.success) {
                continue;
            }

            deletedCallbacks++;
        }

        return res
            .status(200)
            .json(
                successHandler(
                    { totalCallbacks, deletedCallbacks },
                    "Callbacks deleted successfully!"
                )
            );
    } catch (error) {
        console.error("/deleteAllCallbacks =>", error);
        return handleApiRouteError(error, res);
    }
}
