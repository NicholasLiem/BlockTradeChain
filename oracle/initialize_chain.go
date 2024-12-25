package main

import (
	"fmt"
	"math/big"
	"os"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	supplyChain "github.com/NicholasLiem/Blockchain/supplychain"
)

func InitializeChain() (*supplyChain.Supplychain, *bind.TransactOpts, *ethclient.Client, error) {
	chainAddress := "http://127.0.0.1:8545"
	if os.Getenv("BLOCKCHAIN_ADDRESS") != "" {
		chainAddress = os.Getenv("BLOCKCHAIN_ADDRESS")
	}

	client, err := ethclient.Dial(chainAddress)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to connect to the Ethereum client: %v", err)
	}

	contractAddress := common.HexToAddress(os.Getenv("CONTRACT_ADDRESS"))
	privateKey := os.Getenv("PRIVATE_KEY")

	if privateKey == "" {
		return nil, nil, nil, fmt.Errorf("PRIVATE_KEY environment variable is not set")
	}

	// Parse the raw private key
	pk, err := crypto.HexToECDSA(privateKey)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("invalid private key: %v", err)
	}

	// Parse CHAIN_ID
	chainID := big.NewInt(4785)
	if os.Getenv("CHAIN_ID") != "" {
		_, ok := chainID.SetString(os.Getenv("CHAIN_ID"), 10)
		if !ok {
			return nil, nil, nil, fmt.Errorf("failed to parse CHAIN_ID from environment variables")
		}
	}

	// Create authorized transactor
	auth, err := bind.NewKeyedTransactorWithChainID(pk, chainID)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to create authorized transactor: %v", err)
	}

	// Instantiate the contract
	supplyChain, err := supplyChain.NewSupplychain(contractAddress, client)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to instantiate a contract: %v", err)
	}

	return supplyChain, auth, client, nil
}