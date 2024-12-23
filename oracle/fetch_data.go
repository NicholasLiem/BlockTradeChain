package main

import (
    "encoding/json"
    "net/http"
)

type ApiResponse struct {
    ItemID  int    `json:"item_id"`
    Status  string `json:"status"`
}

func fetchExternalData() (*ApiResponse, error) {
    url := "https://api.example.com/status"
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var data ApiResponse
    if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
        return nil, err
    }

    return &data, nil
}