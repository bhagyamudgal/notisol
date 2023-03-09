import Head from "next/head";
import CustomContainer from "@/components/common/CustomContainer";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    SelectField,
    Text,
    VStack,
} from "@chakra-ui/react";
import useAuth from "@/lib/hooks/useAuth";

export default function Dashboard() {
    const { isAuthenticated } = useAuth();

    const RenderDashboard = () => {
        if (isAuthenticated) {
            return (
                <Box maxW="md" mx="auto" bg="gray.700" p={6} rounded="md">
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                placeholder="Please enter your email address"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Events Type</FormLabel>

                            <Box>
                                <Checkbox defaultChecked={true}>
                                    SOL Transfer
                                </Checkbox>
                            </Box>
                            <Box>
                                <Checkbox defaultChecked={true}>
                                    SPL Token Transfer
                                </Checkbox>
                            </Box>
                            <Box>
                                <Checkbox defaultChecked={true}>
                                    NFT Transfer
                                </Checkbox>
                            </Box>
                        </FormControl>

                        <Button>Send me notifications</Button>
                    </VStack>
                </Box>
            );
        } else {
            return (
                <Text fontSize="lg" align="center" fontWeight="medium">
                    Please connect wallet to use the app!
                </Text>
            );
        }
    };

    return (
        <CustomContainer>
            <Head>
                <title>Dashboard | NotiSol</title>
            </Head>

            <RenderDashboard />
        </CustomContainer>
    );
}
