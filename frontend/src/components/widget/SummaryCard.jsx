import React from 'react';
import { Flex, Heading, Text } from "@chakra-ui/react";

const SummaryCard = ({ value, title, description, isLoading }) => {
  return (
    <Flex
      width="100%"
      maxWidth="50vw"
      bg="white"
      borderRadius="xl"
      FlexShadow="md"
      p="6"
      textAlign="center"
      align={'center'}
      direction={'column'}
    >
      <Heading size="6xl" color="#262A41" fontWeight="bold" maxW={'30%'}>
        {isLoading ? 0 : value}
      </Heading>
      <Text fontSize="xl" color="#262A41" fontWeight="semibold" mb="2">
        {title}
      </Text>
      <Text fontSize="md" color="gray.500">
        {description}
      </Text>
    </Flex>
  );
};

export default SummaryCard;
