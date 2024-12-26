// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WalletManager {
    mapping(address => string) private walletNames; // Ethereum wallet => Wallet Name
    mapping(string => address) private nameToAddress; // Wallet Name => Ethereum wallet

    event WalletNameRegistered(address indexed wallet, string name);

    // Register a wallet name
    function registerWalletName(string memory name) public {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(nameToAddress[name] == address(0), "Name already taken");

        walletNames[msg.sender] = name;
        nameToAddress[name] = msg.sender;

        emit WalletNameRegistered(msg.sender, name);
    }

    // Get wallet address by name
    function getWalletByName(string memory name) public view returns (address) {
        address wallet = nameToAddress[name];
        require(wallet != address(0), "Wallet not found");
        return wallet;
    }

    // Get name of a wallet
    function getWalletName(address wallet) public view returns (string memory) {
        return walletNames[wallet];
    }
}