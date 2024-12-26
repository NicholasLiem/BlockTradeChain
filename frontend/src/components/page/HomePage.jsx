import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import InformationCard from '../widget/InformationCard';
import isSessionValid from '../../util/isSessionValid';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { web3 } from '../../web3';
import Popup from '../ui/popup';

const HomePage = () => {
  const navigate = useNavigate();
  const [secret, setSecret] = useState('');
  const [derivedWallet, setDerivedWallet] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const status = await isSessionValid();
      if (!status) {
        navigate("/login");
        return;
      }

      const savedDerivedWallet = Cookies.get("derivedWallet");
      if (!savedDerivedWallet) {
        setIsPopupOpen(true);
      } else {
        setDerivedWallet(savedDerivedWallet);
      }
    };

    checkSession();
  }, [navigate]);

  const handleSaveDerivedWallet = () => {
    const walletId = Cookies.get("walletId");
  
    // Validate walletId
    if (!walletId || !web3.utils.isAddress(walletId)) {
      alert("Invalid wallet ID. Please log in again.");
      return;
    }
  
    // Validate secret
    if (!secret || secret.trim() === "") {
      alert("Secret key cannot be empty.");
      return;
    }
  
    try {
      // Convert the secret to bytes32 format
      const secretHex = web3.utils.utf8ToHex(secret);
      const paddedSecret = web3.utils.padRight(secretHex, 64);
  
      // Derive the wallet address
      const derived = web3.utils.keccak256(
        web3.eth.abi.encodeParameters(["address", "bytes32"], [walletId, paddedSecret])
      );
  
      setDerivedWallet(derived);
      Cookies.set("derivedWallet", derived);
      setIsPopupOpen(false);
      alert("Derived wallet set successfully!");
    } catch (error) {
      console.error("Error deriving wallet:", error);
      alert("Failed to derive wallet. Check your inputs.");
    }
  };

  return (
    <>
      <PageHeading text={'Hi, Nicholas Liem'} />
      <Flex mt={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <InformationCard value="23.59" title="Clock" description="Current Time (GMT+7)" />
        <InformationCard value="1" title="Transactions" description="Total transactions" />
      </Flex>
      <Flex mt={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <InformationCard value="1" title="Ready" description="Goods arrived to be imported" />
        <InformationCard value="30" title="Imported" description="Confirmed Imported Goods" />
      </Flex>
      <Flex mt={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <InformationCard value="1" title="Departed" description="Goods exported" />
        <InformationCard value="30" title="Confirmed" description="Successful transaction" />
      </Flex>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveDerivedWallet}
        secret={secret}
        setSecret={setSecret}
      />
    </>
  );
};

export default HomePage;