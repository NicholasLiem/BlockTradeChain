FROM ethereum/client-go:stable

COPY genesis.json .

RUN geth init ./genesis.json

ENTRYPOINT ["geth"]