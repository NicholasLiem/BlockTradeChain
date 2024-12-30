import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading.jsx';
import SummaryCard from '../widget/SummaryCard.jsx';
import ImportTable from '../widget/ImportTable.jsx';
import AddNewButton from '../widget/AddNewButton.jsx';
import isSessionValid from '../../util/isSessionValid.js';
import { useNavigate } from 'react-router-dom';
import { getImports, getItemDetails } from '../../contracts/contracts';
import Cookies from 'js-cookie';

const ImportPage = () => {
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

      const exportedItems = await getImports(account);
      console.log("Exported items:", exportedItems);

      const detailedItems = await Promise.all(
        exportedItems.map(async (item) => {
          const details = await getItemDetails(item.transactionHash, account);
          return {
            id: item.transactionHash,
            product: details.product || "Unknown",
            qty: details.qty ? Number(details.qty) : 0,
            value: details.value ? Number(details.value) : 0,
            exporter: item.exporter,
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

      const importedItems = detailedItems.filter((item) => item.status === "IMPORTED");
      setItems(importedItems);
    } catch (error) {
      console.error("Error fetching export data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex justify={'space-between'} width={'100%'} align={'center'}>
        <PageHeading text={'Import'} />
      </Flex>
      <Flex my={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <SummaryCard value={items.length.toString()} isLoading={isLoading} title="Imported" description="All Confirmed Goods" />
        <SummaryCard value={Array.from(new Set(items.map(item => item.exporter))).length.toString()} isLoading={isLoading} title="Exporter" description="Number of Exporter" />
      </Flex>
      <Text fontSize="xl" color="#262A41" fontWeight="semibold" mb="4">
        Import History
      </Text>
      <ImportTable data={items} isLoading={isLoading} />
    </>
  );
};

export default ImportPage;