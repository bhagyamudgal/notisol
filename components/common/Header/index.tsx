import { Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthButton from "../AuthButton";
import CustomContainer from "../CustomContainer";

function Header() {
    const router = useRouter();

    console.log(router.pathname);

    const isDashboardRoute = router.pathname.startsWith("/dashboard");

    return (
        <CustomContainer>
            <HStack justifyContent="space-between" mb={4}>
                <Link href="/">
                    <Text fontWeight="semibold" fontSize="2xl" color="blue.400">
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
    );
}

export default Header;
