# Smart Contract

## How to Deploy Smart Contract to Private Chain
1. Run the script
```sh
./migrate.sh
```

2. If the migration fails, probably because in the `truffle-config.js` you'll find inside the network subfield there this field named `from` you must change it with the account that you have created before when initiating the private chain.

3. If you want the changes to affect get the JSON from `build/contracts/SupplyChain.json`
and move it to the `frontend/src/contracts` and `oracle/build/contracts` also update the
binary generated in the `oracle` folder by running `./update_binary.sh` from the `oracle` folder.