package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
    handlers "github.com/NicholasLiem/Blockchain/handlers"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error loading .env file: %v", err)
    }

    supplyChain, auth, client, err := InitializeChain()
	if err != nil {
		log.Fatalf("Failed to initialize blockchain: %v", err)
	}
	defer client.Close()

    r := gin.Default()

    r.POST("/updateStatus", func(c *gin.Context) {
        type RequestPayload struct {
            ItemID int    `json:"item_id"`
            Status string `json:"status"`
        }
    
        var payload RequestPayload
        if err := c.ShouldBindJSON(&payload); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
            return
        }
    
        // Call the function to update the status on the blockchain
        txHash, err := sendDataToBlockchain(payload.ItemID, payload.Status)
        if err != nil {
            log.Printf("Failed to update status: %v", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update status on blockchain"})
            return
        }
    
        // Respond with the transaction hash
        c.JSON(http.StatusOK, gin.H{
            "message":          "Transaction sent successfully",
            "transaction_hash": txHash,
        })
    })

    r.PUT("/updateTime", handlers.UpdateTimeHandler(supplyChain, auth))
	
    r.Run(":8080")
}