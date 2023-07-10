// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(address to, uint256 initialSupply) ERC20("MockERC20", "M20") {
        _mint(to, initialSupply);
    }
}
