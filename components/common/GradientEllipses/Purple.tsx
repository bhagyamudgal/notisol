import { Box } from "@chakra-ui/react";
import React from "react";

function EllipsePurple({ ...params }) {
    return (
        <Box
            position="absolute"
            width="555px"
            height="490px"
            backgroundColor="rgba(55, 17, 148, 0.24)"
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

export default EllipsePurple;
