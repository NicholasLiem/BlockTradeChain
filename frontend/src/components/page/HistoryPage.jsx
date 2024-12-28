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

      const formattedData = await Promise.all(
        transactions.map(async (item) => {
          const details = await getItemDetails(item.transactionHash, userAddress);
          return {
            id: item.transactionHash,
            product: details.product || "Unknown",
            qty: details.qty ? Number(details.qty) : 0,
            value: details.value ? Number(details.value) : 0,
            exporter: item.exporter,
            recipient: item.recipient,
            status: details.status || "Unknown",
            exchangeRate: details.exchangeRate ? Number(details.exchangeRate) : 0,
            exchangeRateTimestamp: new Date(Number(details.exchangeRateTimestamp) * 1000).toLocaleString(),
            exportedtime: details.statusTimestamps?.[0]
              ? new Date(Number(details.statusTimestamps[0]) * 1000).toLocaleString()
              : "N/A",
            confirmedtime:
              details.status === "IMPORTED" && details.statusTimestamps?.length > 1
                ? new Date(
                    Number(details.statusTimestamps[details.statusTimestamps.length - 1]) * 1000
                  ).toLocaleString()
                : "",
            origin: details.exporterCurrency,
            target: details.recipientCurrency,
          };
        })
      );

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
