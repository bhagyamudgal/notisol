import { Box, Button, HStack, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import AuthButton from "../AuthButton";
import CustomContainer from "../CustomContainer";

function Header() {
    const router = useRouter();

    const isDashboardRoute = router.pathname.startsWith("/dashboard");

    return (
        <Box w="full" mb={4}>
            <CustomContainer>
                <HStack justifyContent="space-between" py={1}>
                    <Link as={NextLink} href="/" zIndex={10}>
                        <Text
                            fontWeight="semibold"
                            fontSize="2xl"
                            color="heading.1"
                        >
                            NotiSol
                        </Text>
                    </Link>

                    {isDashboardRoute ? (
                        <AuthButton />
                    ) : (
                        <Button as={Link} href="/dashboard">
                            Go To Dashboard
                        </Button>
                    )}
                </HStack>
            </CustomContainer>
        </Box>
    );
}

export default Header;
