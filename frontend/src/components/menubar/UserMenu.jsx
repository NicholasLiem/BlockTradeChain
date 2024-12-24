import React from 'react';
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import NavigationButton from '../widget/NavigationButton';
import Cookies from 'js-cookie';

const UserMenu = () => {
    const walletId = Cookies.get('walletId') || 'Unknown Wallet';
    const truncatedWalletId = walletId.length > 6 ? `${walletId.substring(0, 15)}...` : walletId;

    return (
        <>
            <Flex direction={'column'} w={'80%'} p={5}>
                <Flex direction='row' gap='5%' align={'center'}>
                    <Image src='logo.png' objectFit="contain" w='20%' alt="Logo" />
                </Flex>
                <Flex direction={'column'} align={'start'} mt={'5%'}>
                    <Heading size={'2xl'}>Nicholas Liem</Heading> 
                    <Text>ID Wallet: {truncatedWalletId}</Text>
                </Flex>
                <Flex mt={'10%'} direction={'column'} align={'start'}>
                    <NavigationButton text='Home' path='/' />
                    <NavigationButton text='Inbox' path='/inbox' />
                    <NavigationButton text='Export' path='/export' />
                    <NavigationButton text='History' path='/history' />
                    <NavigationButton text='Settings' path='/settings' />
                </Flex>
            </Flex>
        </>
    );
};

export default UserMenu;
