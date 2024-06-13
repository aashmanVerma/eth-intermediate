// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {
    address payable public owner;
    uint256 public balance;
    uint256 public totalDonations = 10;
    uint256 public totalAmountDonated = 4389;
    struct Donors {
        string name;
        string email;
    }
    Donors[] donors;

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getTotalDonations() public view returns(uint256){
        return totalDonations;
    }

    function getTotalAmountDonated() public view returns(uint256){
        return totalAmountDonated;
    }

    function donate(uint256 amt, string memory name, string memory email) public payable {
        if (amt == 0) {
            revert("Donation amount must be greater than 0");
        }

        if (amt > balance) {
            revert("Donation amount must be less than the balance");
        }

        totalDonations += 1;
        totalAmountDonated += amt;

        donors.push(Donors(name, email));
    }
}
