package main

import (
	"fmt"
	"math/big"
	"os"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/NicholasLiem/Blockchain/supplychain"
)

func sendDataToBlockchain(itemID int, status string) (string, error) {
	chainAddress := "http://127.0.0.1:8545"
	if os.Getenv("BLOCKCHAIN_ADDRESS") != "" {
		chainAddress = os.Getenv("BLOCKCHAIN_ADDRESS")
	}

	client, err := ethclient.Dial(chainAddress)
	if err != nil {
		return "", fmt.Errorf("Failed to connect to the Ethereum client: %v", err)
	}

	contractAddress := common.HexToAddress(os.Getenv("CONTRACT_ADDRESS"))
	privateKey := os.Getenv("PRIVATE_KEY")

	if privateKey == "" {
		return "", fmt.Errorf("PRIVATE_KEY environment variable is not set")
	}

	// Parse the raw private key
	pk, err := crypto.HexToECDSA(privateKey)
	if err != nil {
		return "", fmt.Errorf("Invalid private key: %v", err)
	}

	// Parse CHAIN_ID
	chainID := big.NewInt(4785)
	if os.Getenv("CHAIN_ID") != "" {
		_, ok := chainID.SetString(os.Getenv("CHAIN_ID"), 10)
		if !ok {
			return "", fmt.Errorf("Failed to parse CHAIN_ID from environment variables")
		}
	}

	// Create authorized transactor
	auth, err := bind.NewKeyedTransactorWithChainID(pk, chainID)
	if err != nil {
		return "", fmt.Errorf("Failed to create authorized transactor: %v", err)
	}

	supplyChain, err := supplychain.NewSupplychain(contractAddress, client)
	if err != nil {
		return "", fmt.Errorf("Failed to instantiate a contract: %v", err)
	}

	tx, err := supplyChain.UpdateStatus(auth, big.NewInt(int64(itemID)), status)
	if err != nil {
		return "", fmt.Errorf("Failed to send transaction: %v", err)
	}

	return tx.Hash().Hex(), nil
}