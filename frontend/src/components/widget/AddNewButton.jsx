import React, { useState } from 'react';
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

const AddNewButton = ({ onNewExport }) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleExportClick = () => {
    if (!product || !quantity || !value || !recipient) {
      alert("All fields are required!");
      return;
    }
    onNewExport(product, parseInt(quantity, 10), parseInt(value, 10), recipient);
    setProduct('');
    setQuantity('');
    setValue('');
    setRecipient('');
  };

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
              <Input placeholder="Product name" value={product} onChange={(e) => setProduct(e.target.value)} />
            </Field>
            <Field label="Quantity">
              <Input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </Field>
            <Field label="Value">
              <Input placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
            </Field>
            <Field label="Recipient">
              <Input placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            </Field>
            <Button
              size="sm"
              bg="#262A41"
              color="white"
              _hover={{ bg: "#1a1d33" }}
              onClick={handleExportClick}
            >
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