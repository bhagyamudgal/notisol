import { NextApiResponse } from "next";
import axios from "axios";

export type ApiResponseType = {
    success: boolean;
    message: string;
    result: any;
};

export const apiResponse = ({ success, message, result }: ApiResponseType) => {
    return {
        success,
        message,
        result,
    };
};

export const errorHandler = (error: any) => {
    return apiResponse({
        success: false,
        message: error?.message ?? "Something went wrong",
        result: null,
    });
};

export const successHandler = (result: any, message: string) => {
    return apiResponse({
        success: true,
        message,
        result,
    });
};

export const apiInstance = axios.create({ baseURL: "/api" });

export const getAuthenticatedApiInstance = () => {
    const token = localStorage.getItem("authToken");

    return axios.create({
        baseURL: "/api",
        headers: {
            Authorization: `Bearer${token}`,
        },
    });
};

export const handleInvalidRoute = (res: NextApiResponse) => {
    return res.status(404).end("Route Not Found!");
};

export const handleApiRouteError = (error: any, res: NextApiResponse) => {
    return res.status(500).json(errorHandler(error));
};

export const handleApiAuthError = (res: NextApiResponse) => {
    return res
        .status(401)
        .json({ success: false, message: "User Not Authenticated!" });
};

export const handleApiClientError = (res: NextApiResponse) => {
    const error = new Error("Wrong Parameters Provided!");
    return res.status(400).json(errorHandler(error));
};
