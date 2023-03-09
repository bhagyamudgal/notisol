import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

type Props = {
    id: string;
    description: string;
    title?: string;
    removeTitle?: boolean;
};

const { ToastContainer, toast } = createStandaloneToast();

const ToastNotification = () => {
    return <ToastContainer />;
};

const defaults: UseToastOptions = {
    position: "top",
    isClosable: true,
    variant: "solid",
};

const showSuccessToast = ({
    id,
    description,
    title = "Success",
    removeTitle = false,
}: Props) => {
    if (!toast.isActive(id)) {
        return toast({
            id,
            description,
            title: removeTitle ? "" : title,
            status: "success",
            ...defaults,
        });
    }
};

const showErrorToast = ({
    id,
    description,
    title = "Error",
    removeTitle = false,
}: Props) => {
    if (!toast.isActive(id)) {
        return toast({
            id,
            title: removeTitle ? "" : title,
            description,
            status: "error",
            ...defaults,
        });
    }
};

const showInfoToast = ({ id, description }: Props) => {
    if (!toast.isActive(id)) {
        return toast({
            id,
            description,
            status: "info",
            ...defaults,
        });
    }
};

export default ToastNotification;
export { toast, showSuccessToast, showErrorToast, showInfoToast };
