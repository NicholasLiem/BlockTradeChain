import React, { useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import PageHeading from '../widget/PageHeading';
import isSessionValid from '../../util/isSessionValid';
import { useNavigate } from 'react-router-dom';
import { web3 } from '../../web3';
import Cookies from 'js-cookie';

const SettingsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
        var status = await isSessionValid()
        if (!status) {
            navigate('/login');
        }
    };

    checkSession();
  }, [navigate]); 

  const stats = [
    { label: "Name", value: "Nicholas Liem", diff: -12 },
    { label: "ID Wallet", value: Cookies.get('walletId') || 'N/A', diff: 12 },
  ];

  const handleLogout = async () => {
    Cookies.remove('walletId');
    Cookies.remove('password');
    navigate('/login');
  };

  return (
    <>
      <Flex justify={'space-between'} width={'100%'} align={'center'}>
        <PageHeading text={'Settings'} />
        <Button backgroundColor={'#262A41'} color={'white'} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
      <DataListRoot orientation="horizontal" mt={'2%'} color={'black'}>
        {stats.map((item) => (
          <DataListItem key={item.label} label={item.label} value={item.value} />
        ))}
      </DataListRoot>
    </>
  );
};

export default SettingsPage;
