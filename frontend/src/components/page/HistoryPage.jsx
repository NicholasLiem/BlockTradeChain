import { useEffect, useState } from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import RadioCard from '../widget/RadioCard';
import HistoryTable from '../widget/HistoryTable';
import { getUserTransactions, getAllTransactions, getItemDetails } from '../../contracts/contracts';
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
      setLoading(true)
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

      setData(transactions);
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

  return (
    <>
      <PageHeading text="History" />
      <Flex my="2%" gap="1%" justify="space-between" width="100%">
        <RadioCard selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </Flex>
      <HistoryTable data={data} isLoading={loading}/>
    </>
  );
};

export default HistoryPage;
