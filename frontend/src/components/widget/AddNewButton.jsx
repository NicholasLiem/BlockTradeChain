import { Input, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";

const AddNewButton = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          color="#262A41"
          _hover={{ color: "white", bg: "#262A41" }} 
          _active={{ color: "white", bg: "#262A41" }} 
        >
          Export New
        </Button>
      </PopoverTrigger>
      <PopoverContent borderRadius="5%" backgroundColor="white" color="black">
        <PopoverArrow />
        <PopoverBody>
          <Stack gap="4">
            <Field label="Product">
              <Input placeholder="Weed" />
            </Field>
            <Field label="Quantity">
              <Input placeholder="32" />
            </Field>
            <Button size="sm" bg="#262A41" color="white" _hover={{ bg: "#1a1d33" }}>
              Export New
            </Button>
          </Stack>
        </PopoverBody>
        <PopoverCloseTrigger>
          <Button size="xs" variant="outline" mt="2">
            Close
          </Button>
        </PopoverCloseTrigger>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default AddNewButton;
