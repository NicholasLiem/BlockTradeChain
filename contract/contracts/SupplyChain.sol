// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct ExchangeRate {
        uint256 rate;
        uint256 timestamp;
    }
    struct Item {
        string product;
        uint256 qty;
        uint256 value;
        address exporter;
        address recipient; // Original Ethereum wallet
        string exporterCurrency;
        string recipientCurrency;
        uint256 exchangeRate;
        uint256 exchangeRateTimestamp;
        string status; // EXPORTED, IMPORTED, CANCELLED
        uint256[] statusTimestamps;
    }
    mapping(bytes32 => Item) private items; // transactionHash => Item
    mapping(address => bytes32[]) private userInbox;
    mapping(address => bytes32[]) private userAssets;
    mapping(string => mapping(string => ExchangeRate)) public exchangeRates; // fromCurrency => toCurrency => ExchangeRate
    address public oracle;
    bytes32[] public transactionHashes;

    event ItemExported(
        bytes32 indexed transactionHash,
        address indexed exporter,
        address indexed recipient
    );
    event StatusUpdated(
        bytes32 indexed transactionHash,
        string newStatus,
        uint256 timestamp
    );
    event ExchangeRateUpdated(
        string fromCurrency,
        string toCurrency,
        uint256 rate,
        uint256 timestamp
    );

    constructor() {
        oracle = msg.sender;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Not authorized");
        _;
    }

    function setOracle(address _oracle) public onlyOracle {
        oracle = _oracle;
    }

    modifier onlyOwner(address user) {
        require(msg.sender == user, "Not authorized");
        _;
    }

    function getInbox(
        address user
    ) public view onlyOwner(user) returns (bytes32[] memory) {
        return userInbox[user];
    }

    function getAssets(
        address user
    ) public view onlyOwner(user) returns (bytes32[] memory) {
        return userAssets[user];
    }

    function updateExchangeRate(
        string memory fromCurrency,
        string memory toCurrency,
        uint256 rate
    ) public onlyOracle {
        exchangeRates[fromCurrency][toCurrency] = ExchangeRate(
            rate,
            block.timestamp
        );
        emit ExchangeRateUpdated(
            fromCurrency,
            toCurrency,
            rate,
            block.timestamp
        );
    }

    function getExchangeRate(
        string memory fromCurrency,
        string memory toCurrency
    ) public view returns (uint256 rate, uint256 timestamp) {
        ExchangeRate memory exchangeRate = exchangeRates[fromCurrency][
            toCurrency
        ];
        require(exchangeRate.rate > 0, "Exchange rate not available");
        return (exchangeRate.rate, exchangeRate.timestamp);
    }

    function exportItem(
        string memory product,
        uint256 qty,
        uint256 value,
        address recipient,
        string memory exporterCurrency,
        string memory recipientCurrency
    ) public returns (bytes32) {
        require(recipient != address(0), "Recipient address cannot be zero");

        uint256 finalRate;
        uint256 rateTimestamp;

        if (keccak256(bytes(exporterCurrency)) == keccak256(bytes("USD"))) {
            // Directly use USD to recipientCurrency
            ExchangeRate memory usdToRecipient = exchangeRates["USD"][
                recipientCurrency
            ];
            if (usdToRecipient.rate > 0) {
                finalRate = usdToRecipient.rate;
                rateTimestamp = usdToRecipient.timestamp;
            }
        } else {
            // Calculate via base (USD)
            ExchangeRate memory baseToExporter = exchangeRates["USD"][
                exporterCurrency
            ];
            ExchangeRate memory baseToRecipient = exchangeRates["USD"][
                recipientCurrency
            ];

            if (baseToExporter.rate > 0 && baseToRecipient.rate > 0) {
                uint256 exporterToBase = 1e18 / baseToExporter.rate;
                finalRate = (exporterToBase * baseToRecipient.rate) / 1e18;
                rateTimestamp = block.timestamp;
            }
        }

        // Fallback to default rate if no rates are available
        if (finalRate == 0) {
            finalRate = 1;
            rateTimestamp = block.timestamp;
        }

        bytes32 transactionHash = keccak256(
            abi.encodePacked(
                msg.sender,
                recipient,
                block.timestamp,
                product,
                qty,
                value,
                exporterCurrency,
                recipientCurrency
            )
        );

        require(
            items[transactionHash].exporter == address(0),
            "Item already exists"
        );

        Item storage newItem = items[transactionHash];
        newItem.product = product;
        newItem.qty = qty;
        newItem.value = value;
        newItem.exporter = msg.sender;
        newItem.recipient = recipient;
        newItem.exporterCurrency = exporterCurrency;
        newItem.recipientCurrency = recipientCurrency;
        newItem.exchangeRate = finalRate;
        newItem.exchangeRateTimestamp = rateTimestamp;
        newItem.status = "EXPORTED";
        newItem.statusTimestamps.push(block.timestamp);

        addToInbox(recipient, transactionHash);

        transactionHashes.push(transactionHash);

        emit ItemExported(transactionHash, msg.sender, recipient);
        return transactionHash;
    }

    function confirmItem(bytes32 transactionHash) public {
        Item storage item = items[transactionHash];
        require(
            item.recipient == msg.sender,
            "Only the recipient can confirm this item"
        );
        require(
            keccak256(bytes(item.status)) == keccak256(bytes("EXPORTED")),
            "Item is not in EXPORTED status"
        );

        item.status = "IMPORTED";
        item.statusTimestamps.push(block.timestamp);

        removeFromInbox(item.recipient, transactionHash);
        addToAsset(msg.sender, transactionHash);

        emit StatusUpdated(transactionHash, "IMPORTED", block.timestamp);
    }

    function denyItem(bytes32 transactionHash) public {
        Item storage item = items[transactionHash];
        require(
            item.recipient == msg.sender,
            "Only the recipient can deny this item"
        );
        require(
            keccak256(bytes(item.status)) == keccak256(bytes("EXPORTED")),
            "Item is not in EXPORTED status"
        );

        item.status = "CANCELLED";
        item.statusTimestamps.push(block.timestamp);

        removeFromInbox(item.recipient, transactionHash);

        emit StatusUpdated(transactionHash, "CANCELLED", block.timestamp);
    }

    function getItemDetails(
        bytes32 transactionHash
    ) public view returns (Item memory) {
        Item memory item = items[transactionHash];
        require(item.exporter != address(0), "Item does not exist");
        require(
            msg.sender == item.exporter || msg.sender == item.recipient,
            "Not authorized to view this item's details"
        );
        return item;
    }

    function addToInbox(address user, bytes32 transactionHash) internal {
        require(msg.sender == user, "Not authorized to add to this inbox");
        userInbox[user].push(transactionHash);
    }

    function removeFromInbox(address user, bytes32 transactionHash) internal {
        require(msg.sender == user, "Not authorized to remove from this inbox");
        bytes32[] storage inboxList = userInbox[user];
        for (uint256 i = 0; i < inboxList.length; i++) {
            if (inboxList[i] == transactionHash) {
                inboxList[i] = inboxList[inboxList.length - 1];
                inboxList.pop();
                break;
            }
        }
    }

    function addToAsset(address user, bytes32 transactionHash) internal {
        require(msg.sender == user, "Not authorized to add to this asset list");
        userAssets[user].push(transactionHash);
    }
}
