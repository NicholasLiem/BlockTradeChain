import { supplyChainContract } from '../web3';

export async function addItem(
    itemId: number,
    name: string,
    status: string,
    account: string
): Promise<void> {
    await supplyChainContract.methods.addItem(itemId, name, status).send({ from: account });
    console.log('Item added:', { itemId, name, status });
}

export async function getItem(itemId: number): Promise<{ name: string; status: string }> {
    const result = await supplyChainContract.methods.getItem(itemId).call();
    return { name: result[0], status: result[1] };
}

export async function updateStatus(
    itemId: number,
    newStatus: string,
    account: string
): Promise<void> {
    await supplyChainContract.methods.updateStatus(itemId, newStatus).send({ from: account });
    console.log('Status updated:', { itemId, newStatus });
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