import React, { useEffect, useState } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import SummaryCard from '../widget/SummaryCard';
import InboxTable from '../widget/InboxTable';
import { confirmItem, denyItem, getInbox } from '../../contracts/contracts';
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

  useEffect(() => {
    fetchInboxItems();
  }, [walletId]);

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
        <SummaryCard value='23.59' title="Clock" description="Current Time (GMT+7)" />
        <SummaryCard value={inboxItems.length} title="Inbox" description="Pending Transactions" />
      </Flex>
      <Flex 
        justify="space-between" 
        align="center"
        width="100%" 
        minHeight="80px"
      >
        <Text fontSize="xl" color="#262A41" fontWeight="semibold" >
          Received
        </Text>
        <Button
            backgroundColor={'#262A41'}
            color={'white'}
            onClick={fetchInboxItems}
            mb={0}
          >
            Refresh
        </Button>
      </Flex>
      <InboxTable
        data={inboxItems}
        isLoading={loading}
        onConfirm={handleConfirm}
        onDeny={handleDeny}
      />
    </>
  );
};

export default InboxPage;