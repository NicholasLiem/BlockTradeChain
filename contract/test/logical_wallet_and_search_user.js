const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", (accounts) => {
    const [account1, account2] = accounts;

    it("should register wallet names and search by name", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Register wallet names
        await supplyChain.registerWalletName("Alice", { from: account1 });
        await supplyChain.registerWalletName("Bob", { from: account2 });

        // Search Bob by name
        const bobAddress = await supplyChain.searchWalletByName("Bob");
        assert.equal(bobAddress, account2, "Bob's address does not match");
    });

    it("should allow exporting items and confirming them", async () => {
        const supplyChain = await SupplyChain.deployed();
        const exporter = accounts[0];
        const recipient = accounts[1];

        // Export item
        const tx = await supplyChain.exportItem("ProductA", 10, 500, recipient, { from: exporter });

        const transactionHash = tx.logs[0].args.transactionHash;

        // Confirm item as recipient
        await supplyChain.confirmItem(transactionHash, { from: recipient });

        // Fetch item details (should work for recipient)
        const itemDetails = await supplyChain.getItemDetails(transactionHash, { from: recipient });
        assert.equal(itemDetails.status, "IMPORTED", "Status should be IMPORTED");
    });
});
