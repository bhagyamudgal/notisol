import { defineStyleConfig } from "@chakra-ui/react";

const Link = defineStyleConfig({
    baseStyle: {
        _hover: {
            textDecoration: "none",
            color: "primary.100",
        },
    },
});

export default Link;
