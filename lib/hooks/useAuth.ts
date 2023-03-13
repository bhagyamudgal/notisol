import { useRecoilState, useResetRecoilState } from "recoil";
import { authState } from "@/store/auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { createSolanaAuthMessage } from "../utils/web3auth";
import { getAuthenticatedUser } from "../utils/api/user";

function useAuth() {
    const { publicKey, disconnect } = useWallet();
    const [auth, setAuth] = useRecoilState(authState);
    const resetAuthState = useResetRecoilState(authState);

    const login = async () => {
        setAuth((prevState) => {
            return { ...prevState, isAuthenticating: true };
        });

        try {
            if (publicKey) {
                const { header, payload, message } = createSolanaAuthMessage(
                    publicKey.toString(),
                    "Sign in with your wallet to use the app."
                );

                const encodedMessage = new TextEncoder().encode(message);

                if (encodedMessage) {
                    // @ts-ignore
                    const signedMessage = await window.solana.request({
                        method: "signMessage",
                        params: {
                            message: encodedMessage,
                            display: "text",
                        },
                    });

                    const signature = signedMessage?.signature;

                    const encodedHeader = JSON.stringify(header);
                    const encodedPayload = JSON.stringify(payload);

                    const authToken = `--${encodedHeader}--${encodedPayload}--${signature}`;

                    if (authToken) {
                        localStorage.setItem("authToken", authToken);

                        const response = await getAuthenticatedUser();

                        if (response.success) {
                            setAuth({
                                isAuthenticated: true,
                                isAuthenticating: false,
                                user: response.result,
                            });
                        } else {
                            throw new Error();
                        }
                    }
                }
            }
        } catch (error) {
            console.error("login =>", error);
            disconnect();
        }

        setAuth((prevState) => {
            return { ...prevState, isAuthenticating: false };
        });
    };

    const refetchUser = async () => {
        if (auth.isAuthenticated) {
            const response = await getAuthenticatedUser();

            if (response.success) {
                setAuth((prevState) => {
                    return { ...prevState, user: response.result };
                });
            } else {
                logout();
            }
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem("authToken");
            resetAuthState();
        } catch (error) {
            console.error("logout =>", error);
        }
    };

    return { ...auth, setAuth, login, logout, refetchUser };
}

export default useAuth;
