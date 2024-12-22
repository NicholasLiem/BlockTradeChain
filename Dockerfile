FROM ethereum/client-go:stable

COPY genesis.json .

RUN geth init ./genesis.json

EXPOSE 8545 30303 30303/udp

ENTRYPOINT ["geth", "--networkid", "1234", "--http", "--http.addr", "0.0.0.0", "--http.api", "personal,eth,net,web3,admin,miner", "--allow-insecure-unlock", "--mine", "--miner.etherbase", "0xbab2dD44c34EFf228eFB458fCCf6192A54a279B6"]