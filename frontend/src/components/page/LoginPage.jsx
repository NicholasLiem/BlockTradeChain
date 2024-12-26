import React, { useState, useEffect } from 'react';
import PageHeading from '../widget/PageHeading';
import { Button, Fieldset, Flex, Input, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useBlockchain } from '../../context/BlockchainContext';
import { useNavigate } from 'react-router-dom';
import { web3 } from '../../web3';
import Cookies from 'js-cookie';
import isSessionValid from '../../util/isSessionValid';

const LoginPage = () => {
    const { accounts } = useBlockchain(); 
    const navigate = useNavigate(); 
    const [walletId, setWalletId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isSessionValid()) {
        navigate('/');
        }
    }, [navigate]); 

    const handleLoginClick = async () => {
        try {
          await web3.eth.personal.unlockAccount(walletId, password, 600);
          
          Cookies.set('walletId', walletId);
          Cookies.set('password', password);
          navigate('/');
        } catch (err) {
          console.error("Unlock failed:", err);
          setError(`Invalid Wallet ID or Password: ${err.message}`);
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
