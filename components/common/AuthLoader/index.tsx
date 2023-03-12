import { customGradient } from "@/theme";
import { Center, Text } from "@chakra-ui/react";
import React from "react";
import LoadingSpinner from "../LoadingSpinner";

function AuthLoader() {
    return (
        <Center
            position="fixed"
            top={0}
            left={0}
            bottom={0}
            right={0}
            bg="background.100"
            bgGradient={customGradient["background-1"]}
            zIndex="overlay"
            flexDirection="column"
        >
            <LoadingSpinner loadingText="Checking Authentication" size="lg" />

            <Text fontSize="lg" py={4}>
                Please Approve signing message to login!
            </Text>
        </Center>
    );
}

export default AuthLoader;
