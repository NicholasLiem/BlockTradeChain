import { supplyChainContract, web3 } from '../util/web3';
import type { EventLog } from 'web3';
import { InboxItem } from './types';

export async function exportItem(
  product: string,
  qty: number,
  value: number,
  recipient: string,
  account: string
): Promise<string> {
  console.log("Exporting item:", { product, qty, value, recipient, account });

  const gasPrice = (await web3.eth.getGasPrice()).toString();
  const txReceipt = await supplyChainContract.methods
    .exportItem(product, qty, value, recipient)
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

export async function getTime(): Promise<string> {
  try {
    const rawResult = await supplyChainContract.methods.getTime().call();

    if (rawResult === undefined || rawResult === null) {
      throw new Error("Invalid rawResult");
    }
    const timestamp = typeof rawResult === 'bigint' ? Number(rawResult) : parseInt(rawResult.toString(), 10);


    const date = new Date(timestamp * 1000);

    return date.toLocaleString();
  } catch (error) {
    console.error("Error fetching time:", error);
    throw error;
  }
}

export async function getUserTransactions(userAddress) {
  try {
    const exportedEvents = await supplyChainContract.getPastEvents('ItemExported' as any, {
      filter: { exporter: userAddress },
      fromBlock: 0,
      toBlock: 'latest',
    });

    const receivedEvents = await supplyChainContract.getPastEvents('ItemExported' as any, {
      filter: { recipient: userAddress },
      fromBlock: 0,
      toBlock: 'latest',
    });

    const allEvents = [...exportedEvents, ...receivedEvents];

    // Map each event to an object
    const allTransactions = allEvents.filter((event): event is EventLog => typeof event !== 'string').map((event: EventLog) => {
      // This is the item hash from the contract's event, not the blockchain transaction
      const itemHash = event.returnValues.transactionHash;

      // If your event only has (transactionHash, exporter, recipient),
      // do not attempt to read product, qty, or value here.
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
    console.error('Error fetching user transactions:', error);
    throw error;
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

export async function getInbox(walletId: string): Promise<InboxItem[]> {
  try {
    const transactionHashes: string[] = await supplyChainContract.methods
      .getInbox(walletId)
      .call({ from: walletId });

    const items = await Promise.all(
      transactionHashes.map(async (hash: string): Promise<InboxItem> => {
        const item: InboxItem = await supplyChainContract.methods
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