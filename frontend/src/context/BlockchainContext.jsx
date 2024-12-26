import React, { createContext, useContext, useState, useEffect } from 'react';
import { web3, supplyChainContract } from '../web3';

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
                const accounts = await web3.eth.getAccounts();
                setAccounts(accounts);
                setIsReady(true);
            } catch (err) {
                console.error('Error initializing blockchain connection:', err);
            }
        }
        initialize();
    }, []);
    console.log(accounts)

    return (
        <BlockchainContext.Provider value={{ web3, supplyChainContract, accounts, isReady }}>
            {children}
        </BlockchainContext.Provider>
    );
};

// Hook to use blockchain context
export const useBlockchain = () => useContext(BlockchainContext);
