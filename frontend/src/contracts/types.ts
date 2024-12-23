export interface SupplyChainItem {
    name: string;
    status: string;
}

export interface SupplyChainContract {
    methods: {
        addItem(itemId: number, name: string, status: string): {
            send(params: { from: string }): Promise<void>;
        };
        getItem(itemId: number): {
            call(): Promise<[string, string]>;
        };
        updateStatus(itemId: number, newStatus: string): {
            send(params: { from: string }): Promise<void>;
        };
    };
}