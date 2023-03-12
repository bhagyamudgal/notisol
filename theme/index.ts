import { extendTheme } from "@chakra-ui/react";
import Link from "./Link";
import Button from "./Button";

const colors = {
    primary: {},
    heading: { 1: "#FFFFFF", 2: "#CECECE" },
    background: { 100: "#1E1E1E" },
};

const components = { Link, Button };

const theme = extendTheme({
    fonts: {
        lato: "'Lato', sans-serif !important",
        heading: `'Lato', sans-serif !important`,
        body: `'Lato', sans-serif !important`,
    },
    colors,
    components,
});

export const customGradient = {
    "background-1":
        "linear-gradient(160.44deg, #000000 2.48%, #1F1A2C 115.78%)",
    "hero-text":
        "linear-gradient(180deg, #FFFFFF 27.59%, rgba(255, 255, 255, 0) 181.9%)",
};

export default theme;
