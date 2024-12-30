import { supplyChainContract, web3 } from '../util/web3';
import type { EventLog } from 'web3';
import { ExportItem, ExchangeRate } from './types';

export async function exportItem(
  product: string,
  qty: number,
  value: number,
  recipient: string,
  account: string,
  origin: string,
  target: string
): Promise<string> {
  console.log("Exporting item:", { product, qty, value, recipient, account, origin, target });

  const gasPrice = (await web3.eth.getGasPrice()).toString();
  const txReceipt = await supplyChainContract.methods
    .exportItem(product, qty, value, recipient, origin, target)
    .send({ from: account, gasPrice });

  const itemExportedEvent = txReceipt.events?.ItemExported;
  if (!itemExportedEvent) {
    throw new Error("No ItemExported event found in transaction receipt");
  }

  const itemHash = itemExportedEvent.returnValues.transactionHash;
  console.log("Item exported with contract hash:", itemHash);

  return itemHash as string;
}

export async function confirmItem(transactionHash: string, account: string): Promise<void> {
  await supplyChainContract.methods
    .confirmItem(transactionHash)
    .send({ from: account });
  console.log("Item confirmed:", { transactionHash });
}

export async function denyItem(transactionHash: string, account: string): Promise<void> {
  await supplyChainContract.methods
    .denyItem(transactionHash)
    .send({ from: account });
  console.log("Item denied:", { transactionHash });
}

export async function getItemDetails(transactionHash: string, account: string): Promise<any> {
  const result = await supplyChainContract.methods
    .getItemDetails(transactionHash)
    .call({ from: account });
  console.log("Item details:", result);
  return result;
}

export async function getUserTransactions(userAddress: string) {
  try {
    const exportedEvents = await supplyChainContract.getPastEvents('ItemExported' as any, {
      filter: { exporter: userAddress },
      fromBlock: 0,
      toBlock: 'latest',
    });

    // Combine and deduplicate events based on transaction hash
    const allEvents = [...exportedEvents];
    const uniqueEvents = [
      ...new Map(
        allEvents
          .filter((event): event is EventLog => typeof event !== 'string')
          .map((event) => [event.returnValues.transactionHash, event])
      ).values(),
    ];

    // Map each event to an object
    const allTransactions = uniqueEvents
      .filter((event): event is EventLog => typeof event !== 'string')
      .map((event: EventLog) => {
        const { transactionHash, exporter, recipient, product, qty, value } =
          event.returnValues;

        return {
          transactionHash,
          exporter,
          recipient,
          product: product || "Unknown",
          qty: qty ? Number(qty) : 0,
          value: value ? Number(value) : 0,
          status: "EXPORTED", // Default status for newly exported items
        };
      });

    // Remove duplicates by using the transactionHash as a unique key
    const uniqueTransactions = Array.from(
      new Map(allTransactions.map((item) => [item.transactionHash, item])).values()
    );

    return uniqueTransactions;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw new Error("Failed to fetch user transactions.");
  }
}

export async function getExports(userAddress: string) {
  try {
    const exportedEvents = await supplyChainContract.getPastEvents('ItemExported' as any, {
      filter: { exporter: userAddress },
      fromBlock: 0,
      toBlock: 'latest',
    });

    const receivedEvents = await supplyChainContract.getPastEvents('ItemExported' as any, {
      filter: { recipient: userAddress},
      fromBlock: 0,
      toBlock: 'latest',
    });

    // Combine and deduplicate events based on transaction hash
    const allEvents = [...exportedEvents, ...receivedEvents];
    const uniqueEvents = [
      ...new Map(
        allEvents
          .filter((event): event is EventLog => typeof event !== 'string')
          .map((event) => [event.returnValues.transactionHash, event])
      ).values(),
    ];

    // Map each event to an object
    const allTransactions = uniqueEvents
      .filter((event): event is EventLog => typeof event !== 'string')
      .map((event: EventLog) => {
        const { transactionHash, exporter, recipient, product, qty, value } =
          event.returnValues;

        return {
          transactionHash,
          exporter,
          recipient,
          product: product || "Unknown",
          qty: qty ? Number(qty) : 0,
          value: value ? Number(value) : 0,
          status: "EXPORTED", // Default status for newly exported items
        };
      });

    // Remove duplicates by using the transactionHash as a unique key
    const uniqueTransactions = Array.from(
      new Map(allTransactions.map((item) => [item.transactionHash, item])).values()
    );

    return uniqueTransactions;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw new Error("Failed to fetch user transactions.");
  }
}

export async function getImports(userAddress: string) {
  try {
    const receivedEvents = await supplyChainContract.getPastEvents('ItemExported' as any, {
      filter: { recipient: userAddress },
      fromBlock: 0,
      toBlock: 'latest',
    });

    const allEvents = [...receivedEvents];
    const uniqueEvents = [
      ...new Map(
        allEvents
          .filter((event): event is EventLog => typeof event !== 'string')
          .map((event) => [event.returnValues.transactionHash, event])
      ).values(),
    ];

    const allTransactions = uniqueEvents
      .filter((event): event is EventLog => typeof event !== 'string')
      .map((event: EventLog) => {
        const { transactionHash, exporter, recipient, product, qty, value } =
          event.returnValues;

        return {
          transactionHash,
          exporter,
          recipient,
          product: product || "Unknown",
          qty: qty ? Number(qty) : 0,
          value: value ? Number(value) : 0,
          status: "EXPORTED",
        };
      });

    const uniqueTransactions = Array.from(
      new Map(allTransactions.map((item) => [item.transactionHash, item])).values()
    );

    return uniqueTransactions;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw new Error("Failed to fetch user transactions.");
  }
}

export async function getAllTransactions() {
  try {
    const events = await supplyChainContract.getPastEvents('ItemExported' as any, {
      fromBlock: 0,
      toBlock: 'latest',
    });

    const allTransactions = events
      .filter((event): event is EventLog => typeof event !== 'string')
      .map((event: EventLog) => {
        const itemHash = event.returnValues.transactionHash;

        return {
          transactionHash: itemHash,
          exporter: event.returnValues.exporter,
          recipient: event.returnValues.recipient,
          product: event.returnValues.product,
          qty: event.returnValues.qty,
          value: event.returnValues.value,
          status: 'EXPORTED',
        };
      });

    return allTransactions;
  } catch (error) {
    console.error('Error fetching all transactions:', error);
    throw error;
  }
}

export async function getInbox(walletId: string): Promise<ExportItem[]> {
  try {
    const transactionHashes: string[] = await supplyChainContract.methods
      .getInbox(walletId)
      .call({ from: walletId });

    const items = await Promise.all(
      transactionHashes.map(async (hash: string): Promise<ExportItem> => {
        const item: ExportItem = await supplyChainContract.methods
          .getItemDetails(hash)
          .call({ from: walletId });

        return {
          transactionHash: hash,
          product: item.product,
          qty: item.qty,
          value: item.value,
          exporter: item.exporter,
          recipient: item.recipient,
          status: item.status,
          statusTimestamps: item.statusTimestamps,
          exportedTime: item.statusTimestamps[0]
            ? new Date(Number(item.statusTimestamps[0]) * 1000).toLocaleString()
            : '',
          confirmedTime:
            item.status === 'IMPORTED' && item.statusTimestamps.length > 1
              ? new Date(Number(item.statusTimestamps[item.statusTimestamps.length - 1]) * 1000).toLocaleString()
              : null,
        };
      })
    );

    return items;
  } catch (error) {
    console.error('Error fetching inbox:', error);
    throw new Error('Failed to fetch inbox.');
  }
}

export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<ExchangeRate> {
  try {
    const exchangeRate: ExchangeRate = await supplyChainContract.methods
      .getExchangeRate(fromCurrency, toCurrency)
      .call();

    return exchangeRate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Failed to fetch exchange rate.');
  }
}