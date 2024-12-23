#!/bin/bash

# Step 1: Generate Accounts
bash generate_accounts.sh

# Step 2: Update genesis.json
python3 update_genesis.py

# Step 3: Initialize and Start Blockchain
bash start_blockchain.sh