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
		mockFilePath := "mocks/ExchangeRate.json"

		file, err := os.Open(mockFilePath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open mock file"})
			return
		}
		defer file.Close()

		fileBytes, err := ioutil.ReadAll(file)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read mock file"})
			return
		}

		var exchangeRateResponse types.ExchangeRateResponseApi
		err = json.Unmarshal(fileBytes, &exchangeRateResponse)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse mock file"})
			return
		}

		baseCurrency := exchangeRateResponse.BaseCode
		conversionRates := exchangeRateResponse.ConversionRates

		var txHashes []string
		for currency, rate := range conversionRates {
			rateBigInt := big.NewInt(int64(rate * 1e6)) // Convert rate to fixed-point with 6 decimals
			tx, err := supplyChain.UpdateExchangeRate(auth, baseCurrency, currency, rateBigInt)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error":    "Failed to update exchange rate for currency",
					"currency": currency,
				})
				return
			}

			txHashes = append(txHashes, tx.Hash().Hex())
		}

		fmt.Println("Conversion rates updated successfully", conversionRates)
		c.JSON(http.StatusOK, gin.H{
			"message":         "Exchange rate updated successfully",
			"transactionHashes": txHashes,
		})
	}
}
