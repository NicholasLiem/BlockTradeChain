import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import InformationCard from '../widget/InformationCard';
import ImportTable from '../widget/ImportTable';
import { confirmItem, denyItem, getInbox, fetchExchangeRateEvents } from '../../contracts/contracts';
import { useAuth } from '../../context/AuthContext';

const InboxPage = () => {
  const { walletId, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState('');
  const [inboxItems, setInboxItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!walletId) {
      logout();
      return;
    }
  }, [walletId, logout]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const events = await fetchExchangeRateEvents();
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    }

    fetchExchangeRate();
  }, [])

  useEffect(() => {
    const fetchInboxItems = async () => {
      setLoading(true);
      try {
        const transactions = await getInbox(walletId);
        setInboxItems(transactions);
      } catch (error) {
        console.error('Error fetching inbox items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInboxItems();
  }, [walletId, inboxItems]);

  const handleConfirm = async (transactionHash) => {
    try {
      await confirmItem(transactionHash, walletId);
      console.log('Item confirmed:', transactionHash);

      // Refresh inbox after confirmation
      setInboxItems((prev) => prev.filter(item => item.transactionHash !== transactionHash));
    } catch (error) {
      console.error('Error confirming item:', error);
    }
  };

  const handleDeny = async (transactionHash) => {
    try {
      await denyItem(transactionHash, walletId);
      console.log('Item denied:', transactionHash);

      // Refresh inbox after denial
      setInboxItems((prev) => prev.filter(item => item.transactionHash !== transactionHash));
    } catch (error) {
      console.error('Error denying item:', error);
    }
  };

  return (
    <>
      <PageHeading text={'Inbox'} />
      <Flex my={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <InformationCard value={currentTime} title="Clock" description="Current Time (GMT+7)" />
        <InformationCard value={inboxItems.length} title="Inbox" description="Pending Transactions" />
        <InformationCard value="30" title="Imported" description="Confirmed Imported Goods" />
      </Flex>
      <ImportTable
        data={inboxItems}
        loading={loading}
        onConfirm={handleConfirm}
        onDeny={handleDeny}
      />
    </>
  );
};

export default InboxPage;