import { defineStyleConfig } from "@chakra-ui/react";

const Link = defineStyleConfig({
    baseStyle: {
        _hover: {
            textDecoration: "none",
            color: "primary.400",
        },
    },
});

export default Link;
