import AuthLoader from "@/components/common/AuthLoader";
import Header from "@/components/common/Header";
import useAuth from "@/lib/hooks/useAuth";
import { VStack } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    const { isAuthenticating } = useAuth();

    return (
        <VStack bgColor="gray.900" color="gray.50" minH="100dvh" w="full">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <Header />
            {children}

            {isAuthenticating && <AuthLoader />}
        </VStack>
    );
}

export default Layout;
