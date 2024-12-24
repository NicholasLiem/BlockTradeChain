import React from 'react';
import { Button, Flex, Image } from "@chakra-ui/react";

const VisitorMenu = () => {

  return (
    <>
        <Flex direction={'column'}>
            <Flex
                dir='row'
                gap='5%'>
                <Image src='logo.png' fit='contain' w='20%'/>
                <Image src='logo-text.png' fit='contain' w='75%'/>
            </Flex>
        </Flex>
    </>
  );
};

export default VisitorMenu;