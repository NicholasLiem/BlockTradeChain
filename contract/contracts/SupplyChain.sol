// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DerivedWallet.sol";

contract SupplyChain is DerivedWallet {
    struct Item {
        string product;
        uint256 qty;
        uint256 value;
        address exporter;
        address recipient; // Original Ethereum wallet
        string status; // EXPORTED, IMPORTED, CANCELLED
        uint256[] statusTimestamps;
    }

    mapping(bytes32 => Item) private items; // transactionHash => Item
    address public oracle;
    uint256 public lastUpdatedTime;
    bytes32[] public transactionHashes;

    event ItemExported(bytes32 indexed transactionHash, address indexed exporter, address indexed recipient);
    event StatusUpdated(bytes32 indexed transactionHash, string newStatus, uint256 timestamp);
    event TimeUpdated(uint256 timestamp);

    constructor() {
        oracle = msg.sender;
        lastUpdatedTime = block.timestamp;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Not authorized");
        _;
    }

    function setOracle(address _oracle) public onlyOracle {
        oracle = _oracle;
    }

    function exportItem(
        string memory product,
        uint256 qty,
        uint256 value,
        address recipient,
        bytes32 derivedWallet
    ) public returns (bytes32) {
        require(recipient != address(0), "Recipient address cannot be zero");

        bytes32 transactionHash = keccak256(
            abi.encodePacked(msg.sender, recipient, block.timestamp, product, qty, value)
        );

        require(items[transactionHash].exporter == address(0), "Item already exists");

        Item storage newItem = items[transactionHash];
        newItem.product = product;
        newItem.qty = qty;
        newItem.value = value;
        newItem.exporter = msg.sender;
        newItem.recipient = recipient;
        newItem.status = "EXPORTED";
        newItem.statusTimestamps.push(block.timestamp);

        addToInbox(derivedWallet, transactionHash);

        transactionHashes.push(transactionHash);

        emit ItemExported(transactionHash, msg.sender, recipient);
        return transactionHash;
    }

    function confirmItem(bytes32 transactionHash, bytes32 derivedWallet) public {
        Item storage item = items[transactionHash];
        require(item.recipient == msg.sender, "Only the recipient can confirm this item");
        require(
            keccak256(bytes(item.status)) == keccak256(bytes("EXPORTED")),
            "Item is not in EXPORTED status"
        );

        item.status = "IMPORTED";
        item.statusTimestamps.push(block.timestamp);

        removeFromInbox(derivedWallet, transactionHash);
        addToAsset(derivedWallet, transactionHash);

        emit StatusUpdated(transactionHash, "IMPORTED", block.timestamp);
    }

    function getItemDetails(bytes32 transactionHash) public view returns (Item memory) {
        Item memory item = items[transactionHash];
        require(item.exporter != address(0), "Item does not exist");
        require(
            msg.sender == item.exporter || msg.sender == item.recipient,
            "Not authorized to view this item's details"
        );
        return item;
    }
}