// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DerivedWallet {
    // Mapping for derived wallet inbox
    mapping(bytes32 => bytes32[]) internal inbox; // Derived wallet => transactionHashes

    // Mapping for derived wallet assets
    mapping(bytes32 => bytes32[]) internal asset; // Derived wallet => transactionHashes (IMPORTED items)

    // Derive a unique wallet address for privacy
    function deriveWallet(address wallet, bytes32 userSecret) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(wallet, userSecret));
    }

    // Add to inbox
    function addToInbox(bytes32 derivedWallet, bytes32 transactionHash) internal {
        inbox[derivedWallet].push(transactionHash);
    }

    // Remove from inbox
    function removeFromInbox(bytes32 derivedWallet, bytes32 transactionHash) internal {
        bytes32[] storage userInbox = inbox[derivedWallet];
        for (uint256 i = 0; i < userInbox.length; i++) {
            if (userInbox[i] == transactionHash) {
                userInbox[i] = userInbox[userInbox.length - 1];
                userInbox.pop();
                break;
            }
        }
    }

    // Add to asset
    function addToAsset(bytes32 derivedWallet, bytes32 transactionHash) internal {
        asset[derivedWallet].push(transactionHash);
    }

    // Get inbox for a derived wallet
    function getInbox(bytes32 derivedWallet) public view returns (bytes32[] memory) {
        return inbox[derivedWallet];
    }

    // Get assets for a derived wallet
    function getAsset(bytes32 derivedWallet) public view returns (bytes32[] memory) {
        return asset[derivedWallet];
    }
}