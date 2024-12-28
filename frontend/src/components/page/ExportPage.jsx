import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading.jsx';
import InformationCard from '../widget/InformationCard.jsx';
import ExportTable from '../widget/ExportTable.jsx';
import AddNewButton from '../widget/AddNewButton.jsx';
import isSessionValid from '../../util/isSessionValid.js';
import { useNavigate } from 'react-router-dom';
import { exportItem, getUserTransactions, getItemDetails } from '../../contracts/contracts';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/AuthContext';

const ExportPage = () => {
  const { walletId, isAuthenticated } = useAuth();
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
            status: details.status || "Unknown",
            exportedtime: details.statusTimestamps?.[0]
              ? new Date(Number(details.statusTimestamps[0]) * 1000).toLocaleString()
              : "N/A",
            confirmedtime:
              details.status === "IMPORTED" && details.statusTimestamps?.length > 1
                ? new Date(
                    Number(details.statusTimestamps[details.statusTimestamps.length - 1]) * 1000
                  ).toLocaleString()
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
      const account = Cookies.get("walletId");
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