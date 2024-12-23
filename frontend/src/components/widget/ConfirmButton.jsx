import { Button, Link, Stack} from "@chakra-ui/react"
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
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
} from "@/components/ui/dialog"

const ConfirmButton = ({itemid, exporttime, importtime}) => {
  return (
    <HoverCardRoot size="sm">
      <HoverCardTrigger asChild>
        <Link href="#" color='black'>Click to Confirm</Link>
      </HoverCardTrigger>
      <HoverCardContent backgroundColor='white'>
        <HoverCardArrow />
        <Stack gap="4" direction="row">
          <Stack gap="3">
            <Stack gap="1">
            <DialogRoot>
            <DialogTrigger asChild>
                <Button variant="solid"  backgroundColor='#262A41' color={'white'} size="sm">
                Confirm
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Import Goods?</DialogTitle>
                </DialogHeader>
                <DialogBody>
                <p>
                    By clicking confirm, I declare to import this
                </p>
                </DialogBody>
                <DialogFooter>
                <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button>Confirm</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
            </DialogRoot>
            </Stack>
          </Stack>
        </Stack>
      </HoverCardContent>
    </HoverCardRoot>
  )
}

export default ConfirmButton;
