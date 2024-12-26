import Web3 from 'web3';
import SupplyChainArtifact from './contracts/SupplyChain.json';

const RPC_URL = 'http://127.0.0.1:8545';
const CONTRACT_ADDRESS = '0x3BdAa952Ba1C08532ff356896C14FE2C8A8b5082';

const web3 = new Web3(RPC_URL);

const SupplyChainABI = SupplyChainArtifact.abi;

const supplyChainContract = new web3.eth.Contract(
    SupplyChainABI,
    CONTRACT_ADDRESS
);

export { web3, supplyChainContract };
