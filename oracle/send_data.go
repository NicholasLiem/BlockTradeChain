package main

import (
	"fmt"
	"log"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

func sendDataToBlockchain(itemID int, status string) {
    client, err := ethclient.Dial("http://127.0.0.1:8545")
    if err != nil {
        log.Fatalf("Failed to connect to the Ethereum client: %v", err)
    }

    contractAddress := common.HexToAddress("0xYourContractAddress")
    privateKey := "0xYourPrivateKey" // Oracle's private key

    auth, err := bind.NewTransactorWithChainID(
        strings.NewReader(privateKey),
        "your_passphrase",
        big.NewInt(1337), // Replace with your chain ID
    )
    if err != nil {
        log.Fatalf("Failed to create authorized transactor: %v", err)
    }

    supplyChain, err := NewSupplyChain(contractAddress, client)
    if err != nil {
        log.Fatalf("Failed to instantiate a contract: %v", err)
    }

    tx, err := supplyChain.UpdateStatus(auth, big.NewInt(int64(itemID)), status)
    if err != nil {
        log.Fatalf("Failed to send transaction: %v", err)
    }

    fmt.Printf("Transaction sent: %s\n", tx.Hash().Hex())
}