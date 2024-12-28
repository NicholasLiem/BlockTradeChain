# Private Chain

## How to Run
1. Run the script
```sh
./master_script.sh
```
2. You'll encounter some problems, that's expected. There will be a folder named blockchainData, there you put all of the keystore from `accounts/keystore` to `blockchainData/keystore`.
3. Then, take the first or any wallet address from the keystore and set the `ETHERBASE` (inside `start_blockchain.sh`) value as the wallet address.
4. And then, just run again by doing
```sh
./start_blockchain.sh
```