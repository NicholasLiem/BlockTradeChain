// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Item {
        string name;
        string status;
    }

    mapping(uint256 => Item) public items;

    event ItemAdded(uint256 itemId, string name, string status);
    event StatusUpdated(uint256 itemId, string newStatus);

    function addItem(uint256 itemId, string memory name, string memory status) public {
        items[itemId] = Item(name, status);
        emit ItemAdded(itemId, name, status);
    }

    function updateStatus(uint256 itemId, string memory newStatus) public {
        require(bytes(items[itemId].name).length > 0, "Item does not exist");
        items[itemId].status = newStatus;
        emit StatusUpdated(itemId, newStatus);
    }

    function getItem(uint256 itemId) public view returns (string memory, string memory) {
        require(bytes(items[itemId].name).length > 0, "Item does not exist");
        Item memory item = items[itemId];
        return (item.name, item.status);
    }
}