import {
    Payload,
    Header as AuthHeader,
    SIWS,
} from "@web3auth/sign-in-with-solana";

export const createSolanaAuthMessage = (address: string, statement: string) => {
    const domain = window.location.host;
    const origin = window.location.origin;

    const header = new AuthHeader();
    header.t = "sip99";
    const payload = new Payload();
    payload.domain = domain;
    payload.address = address;
    payload.uri = origin;
    payload.statement = statement;
    payload.version = "1";
    let message: any = new SIWS({
        header,
        payload,
    });

    // Returning the prepared message
    return { header, payload, message: message.prepareMessage() };
};
