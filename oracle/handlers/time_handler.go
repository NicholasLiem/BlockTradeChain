package handlers

import (
	"log"
	"math/big"
	"net/http"
	"time"

	supplyChain "github.com/NicholasLiem/Blockchain/supplychain"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/gin-gonic/gin"
)

func UpdateTimeHandler(supplyChain *supplyChain.Supplychain, auth *bind.TransactOpts) gin.HandlerFunc {
	return func(c *gin.Context) {
		currentTime := big.NewInt(time.Now().Unix())

		tx, err := supplyChain.UpdateTime(auth, currentTime)
		if err != nil {
			log.Printf("Failed to update time: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update time"})
			return
		}

		log.Printf("Time updated. Transaction hash: %s\n", tx.Hash().Hex())
		c.JSON(http.StatusOK, gin.H{
			"message":        "Time updated successfully",
			"transactionHash": tx.Hash().Hex(),
		})
	}
}