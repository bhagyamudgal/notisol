import { Box, Button, HStack, Text, Link, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import AuthButton from "../AuthButton";
import CustomContainer from "../CustomContainer";
import NoSSR from "../NoSSR";

function Header() {
    const router = useRouter();

    const isDashboardRoute = router.pathname.startsWith("/dashboard");

    return (
        <NoSSR>
            <Box w="full" mb={4}>
                <CustomContainer>
                    <HStack justifyContent="space-between" py={1}>
                        <Link as={NextLink} href="/" zIndex={10}>
                            <HStack>
                                <Image
                                    src="/images/notisol-logo.png"
                                    alt="Notisol Logo"
                                    height={42}
                                />
                                <Text
                                    fontWeight="semibold"
                                    fontSize="2xl"
                                    color="heading.1"
                                >
                                    NotiSol
                                </Text>
                            </HStack>
                        </Link>

                        {isDashboardRoute ? (
                            <AuthButton />
                        ) : (
                            <Button
                                as={NextLink}
                                href="/dashboard"
                                border="1px"
                                borderColor="primary.200"
                            >
                                Dashboard
                            </Button>
                        )}
                    </HStack>
                </CustomContainer>
            </Box>
        </NoSSR>
    );
}

export default Header;
