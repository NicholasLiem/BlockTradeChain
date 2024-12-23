#!/bin/bash

ACCOUNTS_DIR="./accounts"
GENESIS_FILE="./genesis.json"

mkdir -p $ACCOUNTS_DIR

NUM_ACCOUNTS=5

echo "Generating $NUM_ACCOUNTS accounts..."

for ((i = 1; i <= NUM_ACCOUNTS; i++)); do
    PASSWORD="password"
    ACCOUNT=$(geth account new --datadir $ACCOUNTS_DIR --password <(echo $PASSWORD) | grep -o "0x.*")
    echo "Created account: $ACCOUNT"
done

echo "Accounts created in $ACCOUNTS_DIR"