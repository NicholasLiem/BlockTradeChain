import React, { createContext, useContext, useState, useEffect } from 'react';
import { web3, supplyChainContract } from '../util/web3';

// Blockchain Context
const BlockchainContext = createContext({
    web3,
    supplyChainContract,
    accounts: [],
    isReady: false,
});

// Blockchain Provider
export const BlockchainProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function initialize() {
            try {
                const account = await web3.eth.getAccounts();
                setAccounts(account);
                setIsReady(true);
            } catch (err) {
                console.log('Error initializing blockchain connection:', err);
            }
        }
        initialize();
    }, []);

    useEffect(() => {
        console.log(accounts);
    }, [accounts]);

    return (
        <BlockchainContext.Provider value={{ web3, supplyChainContract, accounts, isReady }}>
            {children}
        </BlockchainContext.Provider>
    );
};

// Hook to use blockchain context
export const useBlockchain = () => useContext(BlockchainContext);
