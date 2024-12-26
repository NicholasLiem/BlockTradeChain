import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading.jsx';
import InformationCard from '../widget/InformationCard.jsx';
import ExportTable from '../widget/ExportTable.jsx';
import AddNewButton from '../widget/AddNewButton.jsx';
import isSessionValid from '../../util/isSessionValid.js';
import { useNavigate } from 'react-router-dom';
import { exportItem, getUserTransactions, getItemDetails } from '../../contracts/contracts';

const ExportPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
        var status = await isSessionValid()
        if (!status) {
            navigate('/login');
        }
    };

    checkSession();
    const init = async () => {
      try {
        await fetchExportData();

        console.log("Fetching item details for debugging...");
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    init();
  }, [navigate]);

  const fetchExportData = async () => {
    setIsLoading(true);
    try {
      const account_active = await window.ethereum.request({ method: 'eth_accounts' });
      const account = account_active[0]
      console.log(account_active);
      if (!account) throw new Error("Wallet ID is not set");
  
      // Fetch transaction hashes for the user
      const exportedItems = await getUserTransactions(account);
      console.log("Exported items:", exportedItems);
  
      // Fetch full details for each transaction hash
      const detailedItems = await Promise.all(
        exportedItems.map(async (item) => {
          const details = await getItemDetails(item.transactionHash, account);
          return {
            id: item.transactionHash,
            product: details.product || "Unknown",
            qty: details.qty ? Number(details.qty) : 0,
            value: details.value ? Number(details.value) : 0,
            exportto: item.recipient,
            exportedtime: details.statusTimestamps?.[0]
              ? new Date(Number(details.statusTimestamps[0]) * 1000).toLocaleString()
              : "N/A",
            confirmedtime:
              details.status === "IMPORTED" && details.statusTimestamps?.length > 1
                ? new Date(Number(details.statusTimestamps[details.statusTimestamps.length - 1]) * 1000).toLocaleString()
                : "",
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

  const handleNewExport = async (product, qty, value, recipient) => {
    try {
      const account = await window.ethereum.request({ method: 'eth_accounts' })[0];
      const transactionHash = await exportItem(product, qty, value, recipient, account);
      console.log("Exported item transaction hash:", transactionHash);
      fetchExportData();
    } catch (error) {
      console.error("Failed to export item:", error);
    }
  };

  return (
    <>
      <Flex justify={'space-between'} width={'100%'} align={'center'}>
        <PageHeading text={'Export'} />
        <AddNewButton onNewExport={handleNewExport} />
      </Flex>
      <Flex my={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <InformationCard value={items.length.toString()} title="Departed" description="Goods exported" />
        <InformationCard value="30" title="Confirmed" description="Successful transaction" />
      </Flex>
      <ExportTable data={items} isLoading={isLoading} />
    </>
  );
};

export default ExportPage;