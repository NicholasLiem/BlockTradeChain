import { useEffect, useState } from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import RadioCard from '../widget/RadioCard';
import HistoryTable from '../widget/HistoryTable';
import { getUserTransactions, getAllTransactions } from '../../contracts/contracts';
import isSessionValid from '../../util/isSessionValid';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('all');

  const fetchTransactions = async () => {
    try {
      const sessionValid = await isSessionValid();
      if (!sessionValid) {
        navigate('/login');
        return;
      }

      const userAddress = Cookies.get('walletId');
      let transactions = [];

      if (selectedOption === 'all') {
        transactions = await getAllTransactions();
      } else if (selectedOption === 'person') {
        transactions = await getUserTransactions(userAddress);
      }

      const formattedData = transactions.map((transaction) => ({
        id: transaction.transactionHash,
        product: transaction.product || 'Unknown',
        qty: transaction.qty || 0,
        exporter: transaction.exporter || 'Unknown',
        importer: transaction.recipient || 'Unknown',
        itemexporttime: transaction.timestamp
          ? new Date(transaction.timestamp * 1000).toLocaleString()
          : 'N/A',
        itemimporttime: transaction.importTime
          ? new Date(transaction.importTime * 1000).toLocaleString()
          : '-',
      }));

      setData(formattedData);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedOption, navigate]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text fontSize="lg" color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <>
      <PageHeading text="History" />
      <Flex my="2%" gap="1%" justify="space-between" width="100%">
      <RadioCard selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </Flex>
      <HistoryTable data={data} />
    </>
  );
};

export default HistoryPage;
