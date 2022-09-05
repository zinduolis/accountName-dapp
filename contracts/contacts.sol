pragma solidity >=0.4.22 <0.9.0;

contract Contacts {
    uint256 public count = 0; // state variable

    mapping(uint => Contact) public contacts;

    struct Contact {
        uint id;
        string name;
        string phone;
    }

    constructor() public {
        createContact('Red Graz', '134424');
    }

    function createContact(string memory _name, string memory _phone) public {
        count++;
        contacts[count] = Contact(count, _name, _phone);
    }
}