// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentraPass {
    address public owner;
    mapping (address => mapping (string => string)) private URIs;

    constructor(){
        owner = msg.sender;
    }

    // Store a new password URI
    function storePasswordURI(string memory uid, string memory newURI) public  {
        require(bytes(URIs[msg.sender][uid]).length == 0, "Password URI already set for this site");
        URIs[msg.sender][uid] = newURI;
    }

    // Get a password URI
    function getPasswordURI(string memory uid) public view returns (string memory) {
        require(bytes(URIs[msg.sender][uid]).length != 0, "No password URI set for this site");
        return URIs[msg.sender][uid];
    }

    // Update a password URI
    function updatePasswordURI(string memory uid, string memory newURI) public {
        require(bytes(URIs[msg.sender][uid]).length != 0, "No password URI set for this site");
        URIs[msg.sender][uid] = newURI;
    }

    // Delete a password URI
    function deletePasswordURI(string memory uid) public {
        require(bytes(URIs[msg.sender][uid]).length != 0, "No password URI set for this site");
        delete URIs[msg.sender][uid];
    }
}