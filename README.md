# Blockchain

## How to add peer to the same network
1. Open the ipc of each node
```sh
docker exec -it eth-node2 geth attach /root/data/geth.ipc
```

2. Check the version, make sure they are the same
```sh
net.version
```

3. Get either node's enode info
```sh
admin.nodeInfo.enode
```

4. Add peer to either, use container name instead of localhost/127.0.0.1
```sh
admin.addPeer("enodeInfohere")
```

5. Check if connected
```sh
admin.peers
```

## How to Deploy Your SC
1. Install truffle
```sh
npm install -g truffle
```

2. Move to contract dir
```sh
cd contract
```

3. Compile your SC
```sh
truffle compile
```

4. Make a migration file in the migrations folder

5. Deploy your SC
```sh
truffle deploy
```

## Utils
1. Create new account
```sh
geth account new --datadir /root/.ethereum
```

2. Unlock account
```sh
geth --datadir /root/.ethereum \
     --networkid 1234 \
     --http \
     --http.addr 0.0.0.0 \
     --http.api eth,net,web3,admin \
     --unlock 0xYourAccountAddress \
     --password /password.txt \
     --allow-insecure-unlock
```
