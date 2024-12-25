import Web3 from 'web3';
import SupplyChainArtifact from './contracts/SupplyChain.json';

const RPC_URL = 'http://127.0.0.1:8545';
const CONTRACT_ADDRESS = '0xAd557Bb31ec945A12D51D9D73e7e80c5F55d003d';

const web3 = new Web3(RPC_URL);

const SupplyChainABI = SupplyChainArtifact.abi;

const supplyChainContract = new web3.eth.Contract(
    SupplyChainABI,
    CONTRACT_ADDRESS
);

export { web3, supplyChainContract };
