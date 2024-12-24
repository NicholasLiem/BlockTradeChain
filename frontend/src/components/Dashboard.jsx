import React from 'react';
import { useBlockchain } from '../context/BlockchainContext';

const Dashboard = () => {
    const { accounts, supplyChainContract, isReady } = useBlockchain();

    if (!isReady) return <p>Loading blockchain connection...</p>;

    return (
        <div>
            <h1>Blockchain Dashboard</h1>
            <p>Connected Account: {accounts[0]}</p>
        </div>
    );
};

export default Dashboard;
