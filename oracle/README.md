# Oracle

## How to Integrate and Deploy to Private Chain and Smart Contract

## Commands

1. This updates the generated go code for the contract
```sh
abigen --abi SupplyChain.abi --pkg supplychain --out supplychain/supplychain.go 
```

2. Reads json data set the output in a file
```sh
jq '.abi' build/contracts/SupplyChain.json > SupplyChain.abi  
```