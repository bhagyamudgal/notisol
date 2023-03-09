import { SubscribeForNotificationApiBody } from "@/lib/validators/subscribeForNotification";
import { ApiResponseType, getAuthenticatedApiInstance } from ".";

export const getAuthenticatedUser = async () => {
    const authenticatedApiInstance = getAuthenticatedApiInstance();

    const response = await authenticatedApiInstance.get("/getUser");

    const result: ApiResponseType = response.data;

    return result;
};

export const subscribeForNotification = async (
    data: SubscribeForNotificationApiBody
) => {
    const authenticatedApiInstance = getAuthenticatedApiInstance();

    const response = await authenticatedApiInstance.post(
        "/subscribeForNotification",
        data
    );

    const result: ApiResponseType = response.data;

    return result;
};
