import { useEffect, useState } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import SummaryCard from '../widget/SummaryCard';
import isSessionValid from '../../util/isSessionValid';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getAllTransactions, getItemDetails } from '../../contracts/contracts';

const HomePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      try {
        // Check session validity
        const status = await isSessionValid();
        if (!status) {
          navigate('/login');
          return;
        }

        // Fetch data
        await fetchExportData();
        console.log("Initialization complete.");
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    initializePage();
  }, [navigate]); 

  const handleLogout = async () => {
    Cookies.remove('walletId');
    Cookies.remove('password');
    navigate('/login');
  };

  const fetchExportData = async () => {
    setIsLoading(true);
    try {
      const account = Cookies.get("walletId");
      if (!account) throw new Error("Wallet ID is not set");

      const allItems = await getAllTransactions();

      const detailedItems = await Promise.all(
        allItems.map(async (item) => {
          const details = await getItemDetails(item.transactionHash, account);
          return {
            id: item.transactionHash,
            product: details.product || "Unknown",
            qty: details.qty ? Number(details.qty) : 0,
            value: details.value ? Number(details.value) : 0,
            exporter: item.exporter,
            exportto: item.recipient,
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

      setItems(detailedItems);
    } catch (error) {
      console.error("Error fetching export data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
        <Flex 
          justify="space-between" 
          align="center"
          width="100%" 
          mt="2%"
          minHeight="80px"
        >
          <PageHeading text={'Welcome back! Let’s track your shipments.'} />
          <Button
              backgroundColor={'#262A41'}
              color={'white'}
              onClick={handleLogout}
            >
              Logout
          </Button>
        </Flex>
        <Text color={'gray.500'}>Wallet ID: {Cookies.get('walletId')}</Text>
        <Flex direction={'column'} align={'center'} justify={'center'} height={'100%'} width={'100%'}>
        <Flex mt="2%" gap="2%" justify="center" wrap="wrap" width="100%">
          <Flex direction="row" width="100%" gap="2%" mb="4" justify="center">
            <SummaryCard value={items.filter(item => item.exportto.toString().toLowerCase() == Cookies.get('walletId') && item.status == "EXPORTED").length.toString()} isLoading={isLoading} title="Inbox" description="Total goods in Inbox" />
            <SummaryCard value={items.filter(item => item.exportto.toString().toLowerCase() == Cookies.get('walletId') && item.status == "IMPORTED").length.toString()} isLoading={isLoading} title="Imported" description="Number of goods imported" />
          </Flex>

          <Flex direction="row" width="100%" gap="2%" mb="4" justify="center">
            <SummaryCard value={items.filter(item => item.exporter.toString().toLowerCase() == Cookies.get('walletId') && item.status == 'EXPORTED').length.toString()} isLoading={isLoading} title="Export Departed" description="Number of exports departed" />
            <SummaryCard value={items.filter(item => item.exporter.toString().toLowerCase() == Cookies.get('walletId') && item.status == 'IMPORTED').length.toString()} isLoading={isLoading} title="Export Confirmed" description="Number of sucessful exports" />
            <SummaryCard value={items.filter(item => item.exporter.toString().toLowerCase() == Cookies.get('walletId') && item.status == 'CANCELLED').length.toString()} isLoading={isLoading} title="Export Cancelled" description="Number of cancelled exports" />
          </Flex>
        </Flex>
      </Flex>
      
    </>
  );
};

export default HomePage;
