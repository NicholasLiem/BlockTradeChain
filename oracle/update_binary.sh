jq '.abi' build/contracts/SupplyChain.json > SupplyChain.abi
abigen --abi SupplyChain.abi --pkg supplychain --out supplychain/supplychain.go