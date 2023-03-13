import Head from "next/head";
import CustomContainer from "@/components/common/CustomContainer";
import {
    Box,
    Button,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import Header from "@/components/common/Header";
import EllipseGreen from "@/components/common/GradientEllipses/Green";
import EllipsePurple from "@/components/common/GradientEllipses/Purple";
import { customGradient } from "@/theme";
import Link from "next/link";
import Footer from "@/components/common/Footer";

export default function Home() {
    return (
        <Box w="full" position="relative" overflow="hidden">
            <Head>
                <title>Home | NotiSol</title>
                <meta
                    name="description"
                    content="Stay on Top of Your Solana Wallet Activity with
                            NotiSol. Get Multichannel Notifications for Your Solana
                            Wallet Transactions"
                />
            </Head>

            <EllipseGreen top="-94px" right="-200px" />
            <EllipsePurple top="10px" left="-270px" />

            <Header />

            <CustomContainer>
                <Box minH="650px" py={36} position="relative">
                    <Box
                        position="absolute"
                        top="20px"
                        left="60px"
                        userSelect="none"
                    >
                        <Image src="/images/hero-1.png" alt="hero-1" />
                    </Box>
                    <Box
                        position="absolute"
                        top="20px"
                        left="292px"
                        userSelect="none"
                    >
                        <Image src="/images/hero-2.png" alt="hero-2" />
                    </Box>
                    <Box
                        position="absolute"
                        top={0}
                        right="160px"
                        userSelect="none"
                    >
                        <Image src="/images/hero-3.png" alt="hero-3" />
                    </Box>
                    <Box
                        position="absolute"
                        bottom={0}
                        left="150px"
                        userSelect="none"
                    >
                        <Image src="/images/hero-4.png" alt="hero-4" />
                    </Box>
                    <Box
                        position="absolute"
                        bottom="200px"
                        right="498px"
                        userSelect="none"
                    >
                        <Image src="/images/hero-5.png" alt="hero-5" />
                    </Box>
                    <Box
                        position="absolute"
                        bottom="80px"
                        right="100px"
                        userSelect="none"
                    >
                        <Image src="/images/hero-6.png" alt="hero-6" />
                    </Box>
                    <VStack textAlign="center" spacing={8}>
                        <Heading
                            size="3xl"
                            as="h1"
                            bgGradient={customGradient["hero-text"]}
                            bgClip="text"
                            maxW="2xl"
                            zIndex={10}
                        >
                            Stay on Top of Your Solana Wallet Activity with
                            NotiSol
                        </Heading>

                        <Text color="heading.2" fontSize="xl">
                            Get Multichannel Notifications for Your Solana
                            Wallet Transactions
                        </Text>

                        <Button
                            size="lg"
                            as={Link}
                            href="/dashboard"
                            border="1px"
                            borderColor="primary.200"
                            backdropFilter="auto"
                            backdropBlur="2px"
                        >
                            Get Started
                        </Button>
                    </VStack>
                </Box>

                {/* features */}
                <VStack py={{ base: 4, sm: 10, md: 16, lg: 28 }} spacing={20}>
                    {/* feature-1 */}
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        alignItems={{ base: "center", md: "flex-start" }}
                        spacing={{ base: 5, md: 10 }}
                    >
                        <Image
                            src="/images/features-1.png"
                            alt="feature-1"
                            w="full"
                            maxW={{ base: "300px", md: "400px" }}
                        />

                        <VStack
                            p={0}
                            alignItems={{ base: "center", md: "flex-start" }}
                            textAlign={{ base: "center", md: "left" }}
                        >
                            <Heading as="h2" size="xl">
                                Stay Up-to-Date
                            </Heading>
                            <Text color="heading.2" fontSize="lg">
                                NotiSol will keep you informed about all of your
                                registered wallet transactions and activity, so
                                you can stay in the know.
                            </Text>
                        </VStack>
                    </Stack>

                    {/* feature-2 */}
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        alignItems={{ base: "center", md: "flex-start" }}
                        spacing={{ base: 5, md: 10 }}
                    >
                        <Image
                            display={{ base: "block", md: "none" }}
                            src="/images/features-2.png"
                            alt="feature-2"
                            w="full"
                            maxW={{ base: "300px", md: "400px" }}
                        />

                        <VStack
                            alignItems={{ base: "center", md: "flex-start" }}
                            textAlign={{ base: "center", md: "left" }}
                        >
                            <Heading as="h2" size="xl">
                                Multichannel Notifications
                            </Heading>
                            <Text color="heading.2" fontSize="lg">
                                Get notifications via email, SMS, or other
                                channels of your choice. You&apos;ll never miss
                                an important transaction or event again.
                            </Text>
                        </VStack>

                        <Image
                            display={{ base: "none", md: "block" }}
                            src="/images/features-2.png"
                            alt="feature-2"
                            w="full"
                            maxW={{ base: "300px", md: "400px" }}
                        />
                    </Stack>

                    {/* feature-3 */}
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        alignItems={{ base: "center", md: "flex-start" }}
                        spacing={{ base: 5, md: 10 }}
                    >
                        <Image
                            src="/images/features-3.png"
                            alt="feature-3"
                            w="full"
                            maxW={{ base: "300px", md: "400px" }}
                        />

                        <VStack
                            alignItems={{ base: "center", md: "flex-start" }}
                            textAlign={{ base: "center", md: "left" }}
                        >
                            <Heading as="h2" size="xl">
                                Easy to Use
                            </Heading>
                            <Text color="heading.2" fontSize="lg">
                                Simply connect your Solana wallet, add your
                                email and phone number, and subscribe to the
                                notifications you want to receive.
                            </Text>
                        </VStack>
                    </Stack>

                    {/* feature-4 */}
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        alignItems={{ base: "center", md: "flex-start" }}
                        spacing={{ base: 5, md: 10 }}
                    >
                        <Image
                            display={{ base: "block", md: "none" }}
                            src="/images/features-4.png"
                            alt="feature-4"
                            w="full"
                            maxW={{ base: "300px", md: "400px" }}
                        />

                        <VStack
                            alignItems={{ base: "center", md: "flex-start" }}
                            textAlign={{ base: "center", md: "left" }}
                        >
                            <Heading as="h2" size="xl">
                                Customizable
                            </Heading>
                            <Text color="heading.2" fontSize="lg">
                                With NotiSol, you can choose the notifications
                                you want to receive and customize the frequency
                                of notifications to fit your needs.
                            </Text>
                        </VStack>

                        <Image
                            display={{ base: "none", md: "block" }}
                            src="/images/features-4.png"
                            alt="feature-4"
                            w="full"
                            maxW={{ base: "300px", md: "400px" }}
                        />
                    </Stack>
                </VStack>
            </CustomContainer>

            <Footer />
        </Box>
    );
}
