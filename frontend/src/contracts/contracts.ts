import { supplyChainContract, web3 } from '../web3';
import type { EventLog } from 'web3';
import Cookies from 'js-cookie';

export async function exportItem(
    product: string,
    qty: number,
    value: number,
    recipient: string,
    account: string
  ): Promise<string> {
    const derivedWallet = Cookies.get('derivedWallet');
    if (!derivedWallet) {
      throw new Error("No derived wallet found in cookies");
    }

    console.log("Exporting item:", { product, qty, value, recipient, account, derivedWallet });

    const gasPrice = (await web3.eth.getGasPrice()).toString();
    const txReceipt = await supplyChainContract.methods
      .exportItem(product, qty, value, recipient, derivedWallet)
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

export async function getDebugDetails(transactionHash: string, account: string): Promise<{ exporter: string; recipient: string }> {
    const result = await supplyChainContract.methods
        .getDebugDetails(transactionHash)
        .call({ from: account });

    return {
        exporter: result[0],
        recipient: result[1],
    };
}

export async function getStatusLog(transactionHash: string, account: string): Promise<number[]> {
    const result = await supplyChainContract.methods
        .getStatusLog(transactionHash)
        .call({ from: account });
    console.log("Status log:", result);
    if (!Array.isArray(result)) {
        throw new Error("Expected result to be an array");
    }
    return result.map((timestamp: string) => parseInt(timestamp, 10));
}

export async function getTime(): Promise<string> {
    try {
        const rawResult = await supplyChainContract.methods.getTime().call();
        console.log("Raw result:", rawResult);

        if (rawResult === undefined || rawResult === null) {
            throw new Error("Invalid rawResult");
        }
        const timestamp = typeof rawResult === 'bigint' ? Number(rawResult) : parseInt(rawResult.toString(), 10);

        console.log("Parsed timestamp:", timestamp);

        const date = new Date(timestamp * 1000);
        console.log("Converted date:", date);

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