import React, { useState, useEffect } from 'react';
import PageHeading from '../widget/PageHeading';
import { Button, Fieldset, Flex, Input, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useNavigate } from 'react-router-dom';
import { web3 } from '../../web3';
import Cookies from 'js-cookie';
import isSessionValid from '../../util/isSessionValid';

const LoginPage = () => {
    const navigate = useNavigate(); 
    const [walletId, setWalletId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            if (await isSessionValid()) {
                navigate('/');
            }
        };
    
        checkSession();
    }, [navigate]); 

    const handleLoginClick = async () => {
        try {
          handleMetamask()
          const newAccount = web3.eth.accounts.create();

        console.log('New Account Address:', newAccount.address);
        console.log('New Account Private Key:', newAccount.privateKey);
          await web3.eth.personal.unlockAccount(walletId, password, 5);
          Cookies.set('walletId', walletId);
          Cookies.set('password', password);
         
          if (window.ethereum) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_watchAsset',
                        params: {
                            type: 'ERC20', 
                            options: {
                                address: walletId, 
                                symbol: 'TRC', 
                                decimals: 18,
                            },
                        },
                    });
                } catch (error) {
                    setError('Failed to add the token to Metamask. Please try again.');
                }
            }
          navigate('/');
        } catch (err) {
          setError(`Invalid Wallet ID or Password`);
        }
    };

    const handleMetamask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x12B1',
                    chainName: 'BlockTrade Chain',
                    nativeCurrency: {
                        name: 'Trade Coins',
                        symbol: 'TRC', 
                        decimals: 18,
                    },
                    rpcUrls: [import.meta.env.VITE_RPC_URL || 'http://127.0.0.1:8545'],
                }],
                });
                console.log('Network added successfully!');
            } catch (error) {
                setError(`Cannot connect to Metamask, please check your Metamask configuration.`);
            }
        } else {
            setError(`Please install and configure your Metamask first.`);
        }
    };

    return (
        <>
            <Flex width={'100%'} height={'100%'} direction={'column'} align={'start'} justify={'center'}>
                <PageHeading text={'Empowering Trust, Transforming Trade'} />
                <Fieldset.Root size="lg" maxW="md" color={'black'} mt={'3%'}>
                    <Stack align={'start'}>
                        <Fieldset.HelperText color={error ? 'red.500' : 'black'}>
                            {error ? error : "Please provide your details below."}
                        </Fieldset.HelperText>
                    </Stack>

                    <Fieldset.Content>
                        <Field label="Wallet ID">
                            <Input
                                name="walletid"
                                value={walletId}
                                onChange={(e) => setWalletId(e.target.value)}
                            />
                        </Field>

                        <Field label="Password">
                            <Input
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field>
                    </Fieldset.Content>

                    <Button type="button" alignSelf="flex-start" colorPalette={'blue'} onClick={handleLoginClick}>
                        Login
                    </Button>
                </Fieldset.Root>
            </Flex>
        </>
    );
};

export default LoginPage;
