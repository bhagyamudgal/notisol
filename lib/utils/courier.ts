import { CourierClient } from "@trycourier/courier";
import { COURIER_API_KEY } from "@/lib/env";

const courier = CourierClient({ authorizationToken: COURIER_API_KEY }); // get from the Courier UI

// sendEmail
export const sendEmail = async ({
    email,
    title,
    body,
}: {
    email: string;
    title: string;
    body: string;
}) => {
    const { requestId } = await courier.send({
        message: {
            to: {
                email,
            },
            content: {
                title,
                body,
            },
            routing: {
                method: "single",
                channels: ["email"],
            },
        },
    });

    return requestId;
};
