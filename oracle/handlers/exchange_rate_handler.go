package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/big"
	"net/http"
	"os"

	supplyChain "github.com/NicholasLiem/Blockchain/supplychain"
	"github.com/NicholasLiem/Blockchain/types"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/gin-gonic/gin"
)

func UpdateExchangeRate(supplyChain *supplyChain.Supplychain, auth *bind.TransactOpts) gin.HandlerFunc {
	return func(c *gin.Context) {
		txHashes, err := UpdateExchangeRateInternal(supplyChain, auth)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message":          "Exchange rate updated successfully",
			"transactionHashes": txHashes,
		})
	}
}

func UpdateExchangeRateInternal(supplyChain *supplyChain.Supplychain, auth *bind.TransactOpts) ([]string, error) {
	mockFilePath := "mocks/ExchangeRate.json"

	file, err := os.Open(mockFilePath)
	if err != nil {
		return nil, fmt.Errorf("failed to open mock file: %w", err)
	}
	defer file.Close()

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		return nil, fmt.Errorf("failed to read mock file: %w", err)
	}

	var exchangeRateResponse types.ExchangeRateResponseApi
	err = json.Unmarshal(fileBytes, &exchangeRateResponse)
	if err != nil {
		return nil, fmt.Errorf("failed to parse mock file: %w", err)
	}

	baseCurrency := exchangeRateResponse.BaseCode
	conversionRates := exchangeRateResponse.ConversionRates

	var txHashes []string
	for currency, rate := range conversionRates {
		rateBigInt := big.NewInt(int64(rate * 1e6)) // Convert rate to fixed-point with 6 decimals
		tx, err := supplyChain.UpdateExchangeRate(auth, baseCurrency, currency, rateBigInt)
		if err != nil {
			return nil, fmt.Errorf("failed to update exchange rate for currency %s: %w", currency, err)
		}
		txHashes = append(txHashes, tx.Hash().Hex())
	}

	fmt.Println("Conversion rates updated successfully", conversionRates)
	return txHashes, nil
}