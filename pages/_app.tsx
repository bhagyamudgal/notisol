import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import WalletContextProvider from "../context/WalletContextProvider";
import { RecoilRoot } from "recoil";
import Layout from "@/layout";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <WalletContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </WalletContextProvider>
            </ChakraProvider>
        </RecoilRoot>
    );
}
