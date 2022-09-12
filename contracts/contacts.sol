//SPDX-License-Identifier: MIT
pragma solidity >0.4.17 <0.9.0;

contract Contacts {

    mapping(address => string) public Name;

    constructor() public {
        setName(msg.sender, 'Red Graz');
    }

    function retrieveName(address _owner) public view returns (string memory) {
        return Name[_owner];
    }

    function setName(address _owner, string memory _name) public {
        Name[_owner]= _name;
    }
}