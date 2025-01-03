export interface ExportItem {
    transactionHash: string;
    product: string;
    qty: BigInt;
    value: BigInt;
    exporter: string;
    recipient: string;
    status: string;
    statusTimestamps: BigInt[] | number[];
    exportedTime: BigInt | string;
    confirmedTime: BigInt | string | null;
}

export interface ExchangeRate {
    fromCurrency: string;
    toCurrency: string;
    rate: BigInt;
    timestamp: BigInt;
}