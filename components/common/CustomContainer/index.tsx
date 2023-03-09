import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

function CustomContainer({ children }: { children: ReactNode }) {
    return (
        <Container maxW="7xl" p={{ base: 2, sm: 3, md: 4 }}>
            {children}
        </Container>
    );
}

export default CustomContainer;
