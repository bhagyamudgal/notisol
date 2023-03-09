import { Payload, SIWS } from "@web3auth/sign-in-with-solana";
import { NextApiRequest, NextApiResponse } from "next";

const checkAuthentication = async (req: NextApiRequest) => {
    try {
        const encodedHeader = req.headers?.authorization?.split("--")[1];
        const encodedPayload = req.headers?.authorization?.split("--")[2];
        const signatureString = req.headers?.authorization?.split("--")[3];

        // console.log(encodedHeader, encodedPayload, signatureString);

        if (!encodedHeader || !encodedPayload || !signatureString) {
            throw new Error("No Authorization Header!");
        }

        const header = JSON.parse(encodedHeader);
        const payload: Payload = JSON.parse(encodedPayload);

        // console.log(header, payload, signatureString);

        const signature = { t: header.t, s: signatureString };

        const msg = new SIWS({ header, payload });

        const response = await msg.verify({ payload, signature });

        if (!response.success) {
            throw new Error("Not authenticated!");
        }

        return payload.address;
    } catch (error) {
        console.error("checkAuthentication =>", error);
        return null;
    }
};

export default checkAuthentication;
