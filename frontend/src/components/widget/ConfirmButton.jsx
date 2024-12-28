import { Button, Link, Stack } from "@chakra-ui/react";
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

const ConfirmButton = ({ transactionHash, onConfirm }) => {

  const handleConfirm = async () => {
    try {
      await onConfirm(transactionHash);
      console.log("Confirmed")
    } catch (error) {
      console.error("Error confirming item:", error);
    }
  };

  return (
    <HoverCardRoot size="sm">
      <HoverCardTrigger asChild>
        <Link href="#" color="black">
          Click to Confirm
        </Link>
      </HoverCardTrigger>
      <HoverCardContent backgroundColor="white">
        <HoverCardArrow />
        <Stack gap="4" direction="row">
          <Stack gap="3">
            <Stack gap="1">
              <DialogRoot>
                <DialogTrigger asChild>
                  <Button variant="solid" backgroundColor="#262A41" color="white" size="sm">
                    Confirm
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import Goods?</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <p>By clicking confirm, I declare to import this item.</p>
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={handleConfirm}>Confirm</Button>
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

export default ConfirmButton;