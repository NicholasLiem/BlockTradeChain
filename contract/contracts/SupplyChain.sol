// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Item {
        string name;
        string status;
    }

    address public oracle;
    uint256 public lastUpdatedTime;

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

    mapping(uint256 => Item) public items;

    event ItemAdded(uint256 itemId, string name, string status);
    event StatusUpdated(uint256 itemId, string newStatus);
    event TimeUpdated(uint256 timestamp);

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

    function updateTime(uint256 _time) public onlyOracle {
        lastUpdatedTime = _time;
        emit TimeUpdated(_time);
    }

    function getTime() public view returns (uint256) {
        return lastUpdatedTime;
    }
}