package main

import (
	"log"
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

    r.PUT("/updateTime", handlers.UpdateTimeHandler(supplyChain, auth))
	
    r.Run(":8080")
}