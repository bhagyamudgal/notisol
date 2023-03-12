import {
    Box,
    Button,
    Center,
    HStack,
    Text,
    Icon,
    Link,
    VStack,
} from "@chakra-ui/react";

import CustomContainer from "../CustomContainer";
import { BsTwitter, BsGithub } from "react-icons/bs";

function Footer() {
    return (
        <Box w="full" bg="black" py={10}>
            <CustomContainer>
                <Link href="/">
                    <Text
                        fontWeight="semibold"
                        fontSize="2xl"
                        color="heading.1"
                        align="center"
                        mb={4}
                    >
                        NotiSol
                    </Text>
                </Link>
                <HStack
                    color="heading.2"
                    spacing={8}
                    justifyContent="center"
                    fontSize="4xl"
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
            </CustomContainer>
        </Box>
    );
}

export default Footer;
