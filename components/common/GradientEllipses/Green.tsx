import { Box } from "@chakra-ui/react";
import React from "react";

function EllipseGreen({ ...params }) {
    return (
        <Box
            position="absolute"
            width="531px"
            height="439px"
            background="rgba(28, 191, 223, 0.12)"
            filter="auto"
            blur="100px"
            backdropFilter={{ base: "auto", md: "none" }}
            backdropBlur="none"
            rounded="full"
            userSelect="none"
            {...params}
        />
    );
}

export default EllipseGreen;
