import React from 'react';
import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import NavigationButton from '../widget/NavigationButton';

const UserMenu = () => {

  return (
    <>
        <Flex direction={'column' }w={'80%'}>
            <Flex
                dir='row'
                gap='5%'
                align={'center'}>
                <Image src='logo.png' fit='contain' w='20%'/>
                
            </Flex>
            <Flex direction={'column'} align={'start'} mt={'5%'}>
                    <Heading size={'2xl'}>Nicholas Liem</Heading>
                    <Text>ID Wallet: DJNFKNWKLNKLNW</Text>
                </Flex>
            <Flex mt={'10%'} direction={'column'} align={'start'}>
                <NavigationButton text='Home' path='/'/>
                <NavigationButton text='Inbox' path='/inbox'/>
                <NavigationButton text='Export' path='/export'/>
                <NavigationButton text='History' path='/history'/>
                <NavigationButton text='Settings' path='/settings'/>
            </Flex> 
        </Flex>
    </>
  );
};

export default UserMenu;