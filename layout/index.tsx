import AuthLoader from "@/components/common/AuthLoader";
import Header from "@/components/common/Header";
import useAuth from "@/lib/hooks/useAuth";
import { customGradient } from "@/theme";
import { VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    const { isAuthenticating } = useAuth();
    const router = useRouter();

    return (
        <VStack
            bg="background.100"
            bgGradient={customGradient["background-1"]}
            color="gray.50"
            minH="100dvh"
            w="full"
        >
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            {router.pathname !== "/" && <Header />}

            {children}

            {isAuthenticating && <AuthLoader />}
        </VStack>
    );
}

export default Layout;
