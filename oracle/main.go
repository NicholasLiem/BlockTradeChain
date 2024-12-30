package main

import (
	"fmt"
	"log"

	handlers "github.com/NicholasLiem/Blockchain/handlers"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
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

	// Update exchange rate
	fmt.Println("Updating exchange rate on initialization...")
	if _, err := handlers.UpdateExchangeRateInternal(supplyChain, auth); err != nil {
		fmt.Println("Failed to update exchange rate")
		log.Fatalf("Failed to update exchange rate: %v", err)
	}
	fmt.Println("Exchange rate updated successfully")

	r := gin.Default()

	r.PUT("/exchangeRate", handlers.UpdateExchangeRate(supplyChain, auth))

	r.Run(":8080")
}
