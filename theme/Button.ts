import { defineStyleConfig } from "@chakra-ui/react";
import { customGradient } from ".";

const Button = defineStyleConfig({
    defaultProps: {
        variant: "primary",
    },

    variants: {
        primary: {
            bg: "linear-gradient(94.74deg, rgba(189, 33, 221, 0.48) 10.51%, rgba(48, 20, 143, 0.48) 91.98%);",
            rounded: "full",
            padding: "0.5rem 1.5rem",
        },
    },
});

export default Button;
