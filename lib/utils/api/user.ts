import { ApiResponseType, getAuthenticatedApiInstance } from ".";

export const getAuthenticatedUser = async () => {
    const authenticatedApiInstance = getAuthenticatedApiInstance();

    const response = await authenticatedApiInstance.get("/getUser");

    const result: ApiResponseType = response.data;

    return result;
};
