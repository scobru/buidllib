// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "../factories/FactoryFixedFee.sol";
import "./mockTargetContract.sol";

contract MockFactoryFixedFee is FactoryFixedFee {
    constructor(
        address _owner,
        uint256 _fixedFee
    ) FactoryFixedFee(_owner, _fixedFee) {}

    function createContract(address creator) public payable returns (address) {
        MockTargetContract simpleStorage = new MockTargetContract();
        _createContract(address(simpleStorage));
        emit ContractCreated(address(simpleStorage), creator);
        return address(simpleStorage);
    }
}
