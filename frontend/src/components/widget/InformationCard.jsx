import React from 'react';
import { Box, Heading, Text } from "@chakra-ui/react";

const InformationCard = ({ value, title, description }) => {
  return (
    <Box
      width="100%"
      maxWidth="300px"
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      p="6"
      textAlign="center"
      _hover={{
        boxShadow: "md", 
        transform: "scale(1.05)",
        transition: "all 0.3s ease-in-out",
        cursor: "default",
      }}
    >
      <Heading size="3xl" color="#262A41" fontWeight="bold">
        {value}
      </Heading>
      <Text fontSize="3xl" color="#262A41" fontWeight="semibold" mb="2">
        {title}
      </Text>
      <Text fontSize="md" color="gray.500">
        {description}
      </Text>
    </Box>
  );
};

export default InformationCard;
