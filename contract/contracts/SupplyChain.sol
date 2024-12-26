// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Item {
        string product;
        uint256 qty;
        uint256 value;
        address exporter;
        address recipient;
        string status; // EXPORTED, IMPORTED, CANCELLED
        uint256[] statusTimestamps;
    }

    mapping(bytes32 => Item) private items; // transactionHash => Item
    mapping(bytes32 => address) private itemAccess; // transactionHash => recipient (for privacy)

    address public oracle;
    uint256 public lastUpdatedTime;
    bytes32[] public transactionHashes;

    event ItemExported(bytes32 indexed transactionHash, address indexed exporter, address indexed recipient);
    event StatusUpdated(bytes32 indexed transactionHash, string newStatus, uint256 timestamp);
    event TimeUpdated(uint256 timestamp);

    // set the deployer of the contract as the oracle
    constructor() {
        oracle = msg.sender;
        lastUpdatedTime = block.timestamp;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Not authorized");
        _;
    }

    function setOracle(address _oracle) public {
        require(msg.sender == oracle, "Only the current oracle can assign a new oracle");
        oracle = _oracle;
    }

    function exportItem(
        string memory product,
        uint256 qty,
        uint256 value,
        address recipient
    ) public returns (bytes32) {
        require(recipient != address(0), "Recipient address cannot be zero");

        // Generate a unique transaction hash
        bytes32 transactionHash = keccak256(
            abi.encodePacked(msg.sender, recipient, block.timestamp, product, qty, value)
        );
        
        // Initialize the item and add the first timestamp after creating the struct
        Item storage newItem = items[transactionHash];
        require(newItem.exporter == address(0), "Item already exists");
        newItem.product = product;
        newItem.qty = qty;
        newItem.value = value;
        newItem.exporter = msg.sender;
        newItem.recipient = recipient;
        newItem.status = "EXPORTED";
        newItem.statusTimestamps.push(block.timestamp);

        // Store the recipient for privacy
        itemAccess[transactionHash] = recipient;

        // Add the transaction hash to the list of all transaction hashes
        transactionHashes.push(transactionHash);

        emit ItemExported(transactionHash, msg.sender, recipient);
        return transactionHash;
    }

    function confirmItem(bytes32 transactionHash) public {
        Item storage item = items[transactionHash];
        require(item.recipient == msg.sender, "Only the recipient can confirm this item");
        require(keccak256(bytes(item.status)) == keccak256(bytes("EXPORTED")), "Item is not in EXPORTED status");

        item.status = "IMPORTED";
        item.statusTimestamps.push(block.timestamp);

        emit StatusUpdated(transactionHash, "IMPORTED", block.timestamp);
    }

    function denyItem(bytes32 transactionHash) public {
        Item storage item = items[transactionHash];
        require(item.recipient == msg.sender, "Only the recipient can deny this item");
        require(keccak256(bytes(item.status)) == keccak256(bytes("EXPORTED")), "Item is not in EXPORTED status");

        item.status = "CANCELLED";
        item.statusTimestamps.push(block.timestamp);

        emit StatusUpdated(transactionHash, "CANCELLED", block.timestamp);
    }

    function getItemDetails(bytes32 transactionHash) public view returns (Item memory) {
        Item memory item = items[transactionHash];
        require(item.exporter != address(0), "Item does not exist");
        require(
            msg.sender == item.exporter || msg.sender == item.recipient,
            string(
                abi.encodePacked(
                    "Not authorized to view this item's details: msg.sender=",
                    toAsciiString(msg.sender),
                    ", exporter=",
                    toAsciiString(item.exporter),
                    ", recipient=",
                    toAsciiString(item.recipient)
                )
            )
        );
        return item;
    }

    function getStatusLog(bytes32 transactionHash) public view returns (uint256[] memory) {
        Item memory item = items[transactionHash];
        require(
            msg.sender == item.exporter || msg.sender == item.recipient,
            "Not authorized to view this item's status log"
        );
        return item.statusTimestamps;
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function getDebugDetails(bytes32 transactionHash) public view returns (address, address) {
        Item memory item = items[transactionHash];
        return (item.exporter, item.recipient);
    }

    function getAllItems() public view returns (
        bytes32[] memory,
        string[] memory,
        uint256[] memory,
        uint256[] memory,
        address[] memory,
        address[] memory,
        string[] memory
    ) {
        uint256 itemCount = transactionHashes.length;

        bytes32[] memory hashes = new bytes32[](itemCount);
        string[] memory products = new string[](itemCount);
        uint256[] memory quantities = new uint256[](itemCount);
        uint256[] memory values = new uint256[](itemCount);
        address[] memory exporters = new address[](itemCount);
        address[] memory recipients = new address[](itemCount);
        string[] memory statuses = new string[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            bytes32 hash = transactionHashes[i];
            Item storage item = items[hash];

            hashes[i] = hash;
            products[i] = item.product;
            quantities[i] = item.qty;
            values[i] = item.value;
            exporters[i] = item.exporter;
            recipients[i] = item.recipient;
            statuses[i] = item.status;
        }

        return (hashes, products, quantities, values, exporters, recipients, statuses);
    }

    function updateTime(uint256 _time) public onlyOracle {
        lastUpdatedTime = _time;
        emit TimeUpdated(_time);
    }

    function getTime() public view returns (uint256) {
        return lastUpdatedTime;
    }
}