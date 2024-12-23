package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()

    r.GET("/fetch", func(c *gin.Context) {
        data, err := fetchExternalData()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        sendDataToBlockchain(data.ItemID, data.Status)
        c.JSON(http.StatusOK, gin.H{"message": "Data sent to blockchain", "data": data})
    })

    r.Run(":8080")
}