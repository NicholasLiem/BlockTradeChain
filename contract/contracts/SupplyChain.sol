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
    mapping(address => bytes32[]) private inbox; // recipient => transactionHashes
    mapping(address => bytes32[]) private asset; // recipient => transactionHashes (IMPORTED items)

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

    function deriveInboxAddress(address recipient) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(recipient));
    }

    function removeFromInbox(address recipient, bytes32 transactionHash) internal {
        bytes32[] storage userInbox = inbox[recipient];
        for (uint256 i = 0; i < userInbox.length; i++) {
            if (userInbox[i] == transactionHash) {
                userInbox[i] = userInbox[userInbox.length - 1];
                userInbox.pop();
                break;
            }
        }
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

        require(items[transactionHash].exporter == address(0), "Item already exists");
        
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

        // Store recipient's inbox
        inbox[recipient].push(transactionHash);

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

        removeFromInbox(msg.sender, transactionHash);
        asset[msg.sender].push(transactionHash);

        emit StatusUpdated(transactionHash, "IMPORTED", block.timestamp);
    }

    function denyItem(bytes32 transactionHash) public {
        Item storage item = items[transactionHash];
        require(item.recipient == msg.sender, "Only the recipient can deny this item");
        require(keccak256(bytes(item.status)) == keccak256(bytes("EXPORTED")), "Item is not in EXPORTED status");

        item.status = "CANCELLED";
        item.statusTimestamps.push(block.timestamp);

        removeFromInbox(msg.sender, transactionHash);

        emit StatusUpdated(transactionHash, "CANCELLED", block.timestamp);
    }

    function getInbox(address recipient) public view returns (bytes32[] memory) {
        return inbox[recipient];
    }

    function getAsset(address recipient) public view returns (bytes32[] memory) {
        return asset[recipient];
    }

    function getItemDetails(bytes32 transactionHash) public view returns (Item memory) {
        Item memory item = items[transactionHash];
        require(item.exporter != address(0), "Item does not exist");
        require(
            msg.sender == item.exporter || msg.sender == item.recipient,
            string(
                abi.encodePacked("Not authorized to view this item's details")
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

    function updateTime(uint256 _time) public onlyOracle {
        lastUpdatedTime = _time;
        emit TimeUpdated(_time);
    }

    function getTime() public view returns (uint256) {
        return lastUpdatedTime;
    }
}