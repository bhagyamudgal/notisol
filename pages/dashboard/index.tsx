import Head from "next/head";
import CustomContainer from "@/components/common/CustomContainer";
import {
    Box,
    Button,
    Center,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    Text,
    VStack,
} from "@chakra-ui/react";
import useAuth from "@/lib/hooks/useAuth";
import { useState } from "react";
import { Event } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    SubscribeForNotificationForm,
    subscribeForNotificationFormSchema,
} from "@/lib/validators/subscribeForNotification";
import { useForm } from "react-hook-form";
import {
    showErrorToast,
    showInfoToast,
    showSuccessToast,
} from "@/components/common/ToastNotification";
import { useRecoilValue } from "recoil";
import { solanaNetworkState } from "@/store/solana";
import {
    subscribeForNotification,
    unsubscribeForNotification,
} from "@/lib/utils/api/user";
import { getEventsNetwork } from "@/mongodb/utils/user";

export default function Dashboard() {
    const { isAuthenticated, user, refetchUser } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const solanaNetwork = useRecoilValue(solanaNetworkState);

    const defaultValues: Partial<SubscribeForNotificationForm> = {
        solTransfer: true,
        splTokenTransfer: true,
        nftTransfer: true,
    };

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<SubscribeForNotificationForm>({
        resolver: zodResolver(subscribeForNotificationFormSchema),
        defaultValues,
    });

    const submitHandler = async (data: SubscribeForNotificationForm) => {
        setIsSubmitting(true);
        try {
            const events = [];

            if (data.solTransfer) {
                events.push(Event.SOL_TRANSFER);
            }
            if (data.splTokenTransfer) {
                events.push(Event.TOKEN_TRANSFER);
            }
            if (data.nftTransfer) {
                events.push(Event.NFT_TRANSFER);
            }

            if (events.length === 0) {
                setIsSubmitting(false);
                showInfoToast({
                    id: "events-validation",
                    description: "Please select at least 1 event!",
                });
                return;
            }

            const response = await subscribeForNotification({
                email: data.email,
                network: solanaNetwork,
                events,
            });

            if (!response.success) {
                throw new Error("Something went wrong while subscribing!");
            }

            refetchUser();

            reset(defaultValues);

            showSuccessToast({
                id: "subscribe-notification",
                description:
                    "You have successfully subscribed to receive email notifications!",
            });
        } catch (error) {
            console.error("submitHandler =>", error);
            showErrorToast({
                id: "subscribe-notification",
                description:
                    "Something went wrong while subscribing! Please try again.",
            });
        }
        setIsSubmitting(false);
    };

    const unsubscribeHandler = async () => {
        setIsSubmitting(true);
        try {
            const response = await unsubscribeForNotification({
                network: solanaNetwork,
            });

            if (!response.success) {
                throw new Error("Something went wrong while unsubscribing!");
            }

            refetchUser();

            showSuccessToast({
                id: "unsubscribe-notification",
                description:
                    "You have successfully unsubscribed to receive email notifications!",
            });
        } catch (error) {
            console.error("unsubscribeHandler =>", error);
            showErrorToast({
                id: "unsubscribe-notification",
                description:
                    "Something went wrong while unsubscribing! Please try again.",
            });
        }
        setIsSubmitting(false);
    };

    const RenderDashboard = () => {
        const eventsNetwork = getEventsNetwork(solanaNetwork);

        if (isAuthenticated) {
            if (!user?.callbackId[eventsNetwork]) {
                return (
                    <Box
                        maxW="lg"
                        mx="auto"
                        bg="background.100"
                        p={6}
                        rounded="md"
                    >
                        <VStack
                            spacing={4}
                            as="form"
                            onSubmit={handleSubmit(submitHandler)}
                            noValidate
                        >
                            <FormControl
                                isInvalid={errors?.email ? true : false}
                            >
                                <FormLabel htmlFor="email">
                                    Email Address
                                </FormLabel>
                                <Input
                                    focusBorderColor="primary.100"
                                    id="email"
                                    type="email"
                                    placeholder="Please enter your email address"
                                    {...register("email")}
                                    _placeholder={{ color: "purple.100" }}
                                />
                                <FormErrorMessage>
                                    {errors?.email?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Events Type</FormLabel>
                                <Box>
                                    <Checkbox
                                        id="solTransfer"
                                        {...register("solTransfer")}
                                        colorScheme="primary"
                                    >
                                        SOL Transfer
                                    </Checkbox>
                                </Box>
                                <Box>
                                    <Checkbox
                                        id="splTokenTransfer"
                                        {...register("splTokenTransfer")}
                                        colorScheme="primary"
                                    >
                                        SPL Token Transfer
                                    </Checkbox>
                                </Box>
                                <Box>
                                    <Checkbox
                                        id="nftTransfer"
                                        {...register("nftTransfer")}
                                        colorScheme="primary"
                                    >
                                        NFT Transfer
                                    </Checkbox>
                                </Box>
                            </FormControl>
                            <Button type="submit" isLoading={isSubmitting}>
                                Send me notifications
                            </Button>
                        </VStack>
                    </Box>
                );
            } else {
                return (
                    <Box
                        maxW="lg"
                        mx="auto"
                        bg="background.100"
                        p={6}
                        rounded="md"
                    >
                        <VStack spacing={4}>
                            <Text fontSize="lg">
                                You have subscribed for notifications!
                            </Text>
                            <Button
                                onClick={unsubscribeHandler}
                                isLoading={isSubmitting}
                            >
                                Unsubscribe
                            </Button>
                        </VStack>
                    </Box>
                );
            }

            // return (
            //     <Box maxW="lg" mx="auto" bg="gray.700" py={10} rounded="md">
            //         <Center>
            //             <Heading as="h1" size="2xl">
            //                 Coming Soon!
            //             </Heading>
            //         </Center>
            //     </Box>
            // );
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

            {isAuthenticated && (
                <Box
                    maxW="lg"
                    mx="auto"
                    bg="background.100"
                    p={6}
                    rounded="md"
                    my={20}
                >
                    <VStack>
                        <Text textAlign="center" fontSize="lg">
                            Your feedback matters! Please take a moment to fill
                            out this feedback form.
                        </Text>

                        <Link
                            href="https://forms.gle/fAgbE1HqTh3utkXE8"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text
                                textAlign="center"
                                fontSize="lg"
                                textDecoration="underline"
                            >
                                Click Here
                            </Text>
                        </Link>
                    </VStack>
                </Box>
            )}
        </CustomContainer>
    );
}
