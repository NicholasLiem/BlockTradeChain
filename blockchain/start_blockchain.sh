#!/bin/bash

DATA_DIR="./blockchainData"

ETHERBASE=f67edd81349da2cb5f492d0d03ec4b6f6c4ff4e8

if [ -z "$ETHERBASE" ]; then
  echo "Error: No accounts found. Please create an account before starting the miner."
  exit 1
fi

echo "Using etherbase: $ETHERBASE"

echo "Initializing blockchain with genesis.json..."
geth --datadir $DATA_DIR init genesis.json

echo "Starting the private blockchain..."
geth --datadir $DATA_DIR \
     --networkid 4785 \
     --http \
     --http.addr "0.0.0.0" \
     --http.port 8545 \
     --http.api "personal,eth,net,web3" \
     --http.corsdomain "*" \
     --allow-insecure-unlock \
     --mine \
     --miner.threads=1 \
     --miner.etherbase="$ETHERBASE" \
     --unlock "0x$ETHERBASE" \
     --password "./password.txt" \
     --preload "startmine.js"