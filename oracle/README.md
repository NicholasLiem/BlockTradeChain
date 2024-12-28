# Oracle

## How to Integrate and Deploy to Private Chain and Smart Contract
1. Make sure to set the environment variables to the correct one
2. Run the oracle
```sh
go run .
```
3. Hit the API to update data to blockchain

## Commands
1. Reads json data set the output in a file
```sh
jq '.abi' build/contracts/SupplyChain.json > SupplyChain.abi  
```

2. This updates the generated go code for the contract
```sh
abigen --abi SupplyChain.abi --pkg supplychain --out supplychain/supplychain.go 
```