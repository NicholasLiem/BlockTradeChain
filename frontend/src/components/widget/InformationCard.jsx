import React from 'react';
import { Card, Flex, Heading } from "@chakra-ui/react"

const InformationCard = ({value, title, description}) => {

  return (
    <>
    <Card.Root width="100%" bg={'white'}>
        <Card.Body p={'0 auto'}>
            <Flex gap={'5%'}>
                <Heading size={'4xl'} color={'#262A41'}>{value}</Heading>
                <Flex direction={'column'}>
                    <Card.Title color={'#262A41'}>{title}</Card.Title>
                    <Card.Description>
                    {description}
                    </Card.Description>
                </Flex>
            </Flex>
        </Card.Body>
    </Card.Root>
    </>
  );
};

export default InformationCard;
