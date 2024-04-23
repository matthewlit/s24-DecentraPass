// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentraPass {
    address public owner;
    mapping(address => mapping(string => string)) private URIs;
    mapping(address => string[]) private UIDs;

    constructor() {
        owner = msg.sender;
    }

    // Get all user note URIs
    function getAllNoteURI() public view returns (string[] memory) {
        require(UIDs[msg.sender].length != 0, "No notes");
        string[] memory uids = UIDs[msg.sender];
        string[] memory noteURIs = new string[](uids.length);
        for (uint256 i = 0; i < uids.length; i++) {
            if (bytes(URIs[msg.sender][uids[i]]).length != 0) {
                noteURIs[i] = URIs[msg.sender][uids[i]];
            }
        }
        return noteURIs;
    }

    // Store a new note URI
    function storeNoteURI(string memory uid, string memory newURI) public {
        require(
            bytes(URIs[msg.sender][uid]).length == 0,
            "URI already set for this note"
        );
        UIDs[msg.sender].push(uid);
        URIs[msg.sender][uid] = newURI;
    }

    // Get a note URI
    function getNoteURI(string memory uid) public view returns (string memory) {
        require(
            bytes(URIs[msg.sender][uid]).length != 0,
            "NoURI set for this note"
        );
        return URIs[msg.sender][uid];
    }

    // Update a note URI
    function updateNoteURI(string memory uid, string memory newURI) public {
        require(
            bytes(URIs[msg.sender][uid]).length != 0,
            "No URI set for this note"
        );
        URIs[msg.sender][uid] = newURI;
    }

    // Delete a password URI
    function deleteNoteURI(string memory uid) public {
        require(
            bytes(URIs[msg.sender][uid]).length != 0,
            "No URI set for this note"
        );
        delete URIs[msg.sender][uid];
    }
}
