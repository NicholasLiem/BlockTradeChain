#!/bin/bash

DATA_DIR="./blockchainData"

ETHERBASE=$(geth --datadir "$DATA_DIR" account list | head -n 1 | awk -F '[{}]' '{print $2}')

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
     --preload "startmine.js"