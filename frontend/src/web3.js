import Web3 from 'web3';
import SupplyChainArtifact from './contracts/SupplyChain.json';

const RPC_URL = 'http://127.0.0.1:8545';
const CONTRACT_ADDRESS = '0xDcAd25Ed6eBBb4cA130E9D489Ce28f1bc37FEE6D';

const web3 = new Web3(RPC_URL);

const SupplyChainABI = SupplyChainArtifact.abi;

const supplyChainContract = new web3.eth.Contract(
    SupplyChainABI,
    CONTRACT_ADDRESS
);

export { web3, supplyChainContract };
