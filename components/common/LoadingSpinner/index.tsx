import { Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {
    loadingText?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    color?: string;
}

function LoadingSpinner({
    loadingText,
    size = "xl",
    color = "rgba(189, 33, 221, 0.48)",
}: Props) {
    return (
        <VStack spacing={4}>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color={color}
                size={size}
            />

            {loadingText && (
                <Text
                    textAlign="center"
                    maxW="280px"
                    color={color}
                    fontWeight="medium"
                    fontSize="lg"
                >
                    {loadingText}
                </Text>
            )}
        </VStack>
    );
}

export default LoadingSpinner;
