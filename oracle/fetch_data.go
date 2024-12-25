package main

import (
    "encoding/json"
)

type ApiResponse struct {
    ItemID  int    `json:"item_id"`
    Status  string `json:"status"`
}

func fetchExternalData() (*ApiResponse, error) {
    mockData := `{
        "item_id": 1,
        "status": "Delivered"
    }`

    var data ApiResponse
    if err := json.Unmarshal([]byte(mockData), &data); err != nil {
        return nil, err
    }

    return &data, nil
}