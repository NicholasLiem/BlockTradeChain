import React, { useEffect, useState } from 'react';
import { Button, Flex, Box } from '@chakra-ui/react';
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import PageHeading from '../widget/PageHeading';
import isSessionValid from '../../util/isSessionValid';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [isWalletVisible, setIsWalletVisible] = useState(false); // Visibility state for the derived wallet

  useEffect(() => {
    const checkSession = async () => {
      const status = await isSessionValid();
      if (!status) {
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  const stats = [
    { label: "ID Wallet", value: Cookies.get('walletId') || 'N/A', diff: 12 },
    {
      label: "Asset Wallet",
      value: isWalletVisible
        ? Cookies.get("derivedWallet") || 'N/A'
        : "••••••••••••••••••••••••",
      diff: 12,
    },
  ];

  const handleLogout = async () => {
    Cookies.remove('walletId');
    Cookies.remove('password');
    Cookies.remove('derivedWallet');
    navigate('/login');
  };

  const toggleWalletVisibility = () => {
    setIsWalletVisible((prev) => !prev);
  };

  return (
    <>
      <Flex justify={'space-between'} width={'100%'} align={'center'}>
        <PageHeading text={'Settings'} />
        <Flex gap={4}>
          <Button
            backgroundColor={'#262A41'}
            color={'white'}
            onClick={toggleWalletVisibility}
          >
            {isWalletVisible ? "Hide Wallet" : "Show Wallet"}
          </Button>
          <Button
            backgroundColor={'#262A41'}
            color={'white'}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
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