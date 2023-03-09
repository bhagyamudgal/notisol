import useAuth from "@/lib/hooks/useAuth";
import { shortenWalletAddress } from "@/lib/utils/solana";
import { Button } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

function AuthButton() {
    const { connected, publicKey } = useWallet();
    const { logout, login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!connected) {
            logout();
        } else {
            if (!isAuthenticated) {
                login();
            }
        }
    }, [connected]); // eslint-disable-line

    return (
        <Button as={WalletMultiButton} _hover={{ bg: "blue.600 !important" }}>
            {connected && publicKey
                ? shortenWalletAddress(publicKey?.toString())
                : "Connect Wallet"}
        </Button>
    );
}

export default AuthButton;
