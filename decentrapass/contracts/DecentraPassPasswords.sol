// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentraPass {
    address public owner;
    mapping(address => mapping(string => string)) private URIs;
    mapping(address => string[]) private UIDs;

    constructor() {
        owner = msg.sender;
    }

    // Get all user password URIs
    function getAllPasswordURI() public view returns (string[] memory) {
        require(UIDs[msg.sender].length != 0, "No passwords");
        string[] memory uids = UIDs[msg.sender];
        string[] memory siteURIs = new string[](uids.length);
        for (uint256 i = 0; i < uids.length; i++) {
            if (bytes(URIs[msg.sender][uids[i]]).length != 0) {
                siteURIs[i] = URIs[msg.sender][uids[i]];
            }
        }
        return siteURIs;
    }

    // Store a new password URI
    function storePasswordURI(string memory uid, string memory newURI) public {
        require(
            bytes(URIs[msg.sender][uid]).length == 0,
            "Password URI already set for this site"
        );
        UIDs[msg.sender].push(uid);
        URIs[msg.sender][uid] = newURI;
    }

    // Get a password URI
    function getPasswordURI(
        string memory uid
    ) public view returns (string memory) {
        require(
            bytes(URIs[msg.sender][uid]).length != 0,
            "No password URI set for this site"
        );
        return URIs[msg.sender][uid];
    }

    // Update a password URI
    function updatePasswordURI(string memory uid, string memory newURI) public {
        require(
            bytes(URIs[msg.sender][uid]).length != 0,
            "No password URI set for this site"
        );
        URIs[msg.sender][uid] = newURI;
    }

    // Delete a password URI
    function deletePasswordURI(string memory uid) public {
        require(
            bytes(URIs[msg.sender][uid]).length != 0,
            "No password URI set for this site"
        );
        delete URIs[msg.sender][uid];
    }
}
