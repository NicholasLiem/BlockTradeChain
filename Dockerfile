FROM ethereum/client-go:stable

COPY genesis.json .

RUN geth init ./genesis.json

EXPOSE 8545 30303 30303/udp

ENTRYPOINT ["geth", "--datadir", "/root/data", "--networkid", "1234", "--http", "--http.addr", "0.0.0.0", "--http.api", "personal,eth,net,web3,admin", "--allow-insecure-unlock"]