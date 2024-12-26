import React from "react";
import { Box, Button, Flex, Input, VStack, Text } from "@chakra-ui/react";

const Popup = ({ isOpen, onClose, onSave, secret, setSecret }) => {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="1000"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box bg="white" p="6" borderRadius="md" boxShadow="lg" width="400px">
        <Text fontSize="lg" mb={4} color={'black'}>
          Set Derived Wallet
        </Text>
        <Input
          placeholder="Enter your secret key"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          type="password"
          mb={4}
          color={'black'}
        />
        <Flex justify="space-between">
          <Button colorScheme="blue" onClick={onSave} _hover={{ bg: 'blue.100' }}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose} color={'red'} _hover={{ bg: 'red.100' }}>
            Cancel
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Popup;