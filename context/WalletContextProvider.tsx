import { ReactNode } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useRecoilValue } from "recoil";
import { solanaNetworkState } from "@/store/auth";
import { getSolanaRpcUrl } from "@/lib/utils/solana";

type Props = { children: ReactNode };

const WalletContextProvider = ({ children }: Props) => {
    const network = useRecoilValue(solanaNetworkState);

    const url = useMemo(() => getSolanaRpcUrl(network), [network]);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]); // eslint-disable-line

    return (
        <ConnectionProvider endpoint={url}>
            <WalletProvider wallets={wallets} autoConnect={false}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
