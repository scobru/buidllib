// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/access/Ownable.sol";

contract FixedFee is Ownable {
    uint256 public fixedFee;

    event FixedFeeChanged(uint256 indexed newFixedFee);

    constructor(uint256 _fixedFee) {
        setFixedFee(_fixedFee);
    }

    function setFixedFee(uint256 _fixedFee) public onlyOwner {
        fixedFee = _fixedFee;
        emit FixedFeeChanged(_fixedFee);
    }

    function getFixedFee() public view returns (uint256) {
        return fixedFee;
    }
}
