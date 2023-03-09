import { extendTheme } from "@chakra-ui/react";
import Link from "./Link";
import Button from "./Button";

const colors = {};

const components = { Link, Button };

const theme = extendTheme({
    colors,
    components,
});

export default theme;
