// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Gems {
    address[16] public buyers;

    // Reserving a diamond
    function buyItem(uint itemId) public returns (uint) {
    require(itemId >= 0 && itemId <= 15);

    buyers[itemId] = msg.sender;

    return itemId;
    }

    // Retrieving the buyers
    function getBuyers() public view returns (address[16] memory) {
    return buyers;
    }
}


