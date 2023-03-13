import {
    Box,
    Button,
    Center,
    HStack,
    Text,
    Icon,
    Link,
    VStack,
    Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import CustomContainer from "../CustomContainer";
import { BsTwitter, BsGithub } from "react-icons/bs";

function Footer() {
    return (
        <Box w="full" bg="black" py={10}>
            <CustomContainer>
                <Link as={NextLink} href="/">
                    <HStack justifyContent="center" mb={2}>
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
                <HStack
                    color="heading.2"
                    spacing={8}
                    justifyContent="center"
                    fontSize="4xl"
                    mb={2}
                >
                    <Link
                        href="https://twitter.com/notisolxyz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon as={BsTwitter} />
                    </Link>

                    <Link
                        href="https://github.com/notisolxyz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon as={BsGithub} />
                    </Link>
                </HStack>
                <Link
                    href="https://forms.gle/fAgbE1HqTh3utkXE8"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Text
                        textAlign="center"
                        fontSize="lg"
                        textDecoration="underline"
                    >
                        Feedback Form
                    </Text>
                </Link>
            </CustomContainer>
        </Box>
    );
}

export default Footer;
