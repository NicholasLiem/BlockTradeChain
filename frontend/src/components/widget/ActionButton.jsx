import { Button, Link, Stack, Spinner } from "@chakra-ui/react";
import {
    HoverCardArrow,
    HoverCardContent,
    HoverCardRoot,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNotification } from "../../context/NotificationContext";

const ActionButton = ({
    transactionHash,
    onAction,
    actionType = "confirm",
    triggerText = "Click to Confirm",
    dialogTitle = "Confirm Action?",
    dialogDescription = "Are you sure you want to confirm this item?",
    buttonText = "Confirm",
    buttonColor = "green"
}) => {
    const showNotification = useNotification();
    const [loading, setLoading] = useState(false);

    const handleAction = async () => {
        setLoading(true);
        try {
            await onAction(transactionHash);
            showNotification({
                status: "success",
                title: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} Successful`,
                description: `The item has been successfully ${actionType}ed.`,
            });
        } catch (error) {
            console.error(`Error ${actionType}ing item:`, error);
            showNotification({
                status: "error",
                title: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} Failed`,
                description: `An error occurred while ${actionType}ing the item.`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <HoverCardRoot size="sm">
            <HoverCardTrigger asChild>
                <Link href="#" color="black">
                    {triggerText}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent backgroundColor="white">
                <HoverCardArrow />
                <Stack gap="4" direction="row">
                    <Stack gap="3">
                        <Stack gap="1">
                            <DialogRoot>
                                <DialogTrigger asChild>
                                    <Button variant="solid" colorScheme={buttonColor} size="sm">
                                        {buttonText}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{dialogTitle}</DialogTitle>
                                    </DialogHeader>
                                    <DialogBody>
                                        <p>{dialogDescription}</p>
                                    </DialogBody>
                                    <DialogFooter>
                                        <DialogActionTrigger asChild>
                                            <Button variant="outline" isDisabled={loading}>Cancel</Button>
                                        </DialogActionTrigger>
                                        <Button colorScheme={buttonColor} onClick={handleAction} isLoading={loading}>
                                            {loading ? <Spinner size="sm" /> : buttonText}
                                        </Button>
                                    </DialogFooter>
                                    <DialogCloseTrigger />
                                </DialogContent>
                            </DialogRoot>
                        </Stack>
                    </Stack>
                </Stack>
            </HoverCardContent>
        </HoverCardRoot>
    );
};

export default ActionButton;