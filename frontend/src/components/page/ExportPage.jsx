import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading.jsx';
import SummaryCard from '../widget/SummaryCard.jsx';
import ExportTable from '../widget/ExportTable.jsx';
import AddNewButton from '../widget/AddNewButton.jsx';
import isSessionValid from '../../util/isSessionValid.js';
import { useNavigate } from 'react-router-dom';
import { exportItem, getItemDetails, getExports } from '../../contracts/contracts';
import Cookies from 'js-cookie';
import { Toaster, toaster } from "@/components/ui/toaster"

const ExportPage = () => {
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

  const fetchExportData = async () => {
    setIsLoading(true);
    try {
      const account = Cookies.get("walletId");
      if (!account) throw new Error("Wallet ID is not set");

      const exportedItems = await getExports(account);
      console.log("Exported items:", exportedItems);

      const detailedItems = await Promise.all(
        exportedItems.map(async (item) => {
          const details = await getItemDetails(item.transactionHash, account);
          return {
            id: item.transactionHash,
            product: details.product || "Unknown",
            qty: details.qty ? Number(details.qty) : 0,
            value: details.value ? Number(details.value) : 0,
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
  };

  const handleNewExport = async (product, qty, value, recipient, origin, target) => {
    try {
      const account = Cookies.get("walletId");
      console.log('Exporting ...')
      const transactionHash = await exportItem(product, qty, value, recipient, account, origin, target);
      console.log("Exported item transaction hash:", transactionHash);
      fetchExportData();
      console.log('fnwqjkhfkqew')
      toaster.create({
        title: `Item has been exported to recipient`,
        type: 'success',
      })
    } catch (error) {
      console.log('wskqflwqkfkl')
      toaster.create({
        title: `Something is wrong. Please try again`,
        type: 'error',
      })
      console.error("Failed to export item:", error);
    }
  };

  return (
    <>
      <Toaster/>
      <Flex justify={'space-between'} width={'100%'} align={'center'}>
        <PageHeading text={'Export'} />
        <AddNewButton onNewExport={handleNewExport} />
      </Flex>
      <Flex my={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <SummaryCard value={items.length.toString()} isLoading={isLoading} title="Exports" description="Total export attempts" />
        <SummaryCard value={items.filter(item => item.status === 'EXPORTED').length.toString()} isLoading={isLoading} title="Departed" description="Goods exported" />
        <SummaryCard value={items.filter(item => item.status === 'IMPORTED').length.toString()} title="Confirmed" isLoading={isLoading} description="Successful transaction" />
        <SummaryCard value={items.filter(item => item.status === 'CANCELLED').length.toString()} title="Cancelled" isLoading={isLoading} description="Goods Returned by Recipient" />
      </Flex>
      <Text fontSize="xl" color="#262A41" fontWeight="semibold" mb="4">
        Export History
      </Text>
      <ExportTable data={items} isLoading={isLoading} />
    </>
  );
};

export default ExportPage;