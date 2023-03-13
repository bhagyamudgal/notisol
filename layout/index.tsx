import AuthLoader from "@/components/common/AuthLoader";
import Header from "@/components/common/Header";
import { GA_MEASUREMENT_ID } from "@/lib/env";
import useAuth from "@/lib/hooks/useAuth";
import { pageview } from "@/lib/utils/googleAnalytics";
import { customGradient } from "@/theme";
import { Box, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { ReactNode, useEffect } from "react";

function Layout({ children }: { children: ReactNode }) {
    const { isAuthenticating } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            pageview(url);
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

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

            <Box visibility="hidden" h={0}>
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                />
                    
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `,
                    }}
                />
            </Box>

            {router.pathname !== "/" && <Header />}

            {children}

            {isAuthenticating && <AuthLoader />}
        </VStack>
    );
}

export default Layout;
