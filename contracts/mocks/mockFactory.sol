// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../factories/Factory.sol";
import "./mockTargetContract.sol";

contract MockFactory is Factory {
    constructor(address _owner) Factory(_owner) {}

    function createContract(address creator) public returns (address) {
        MockTargetContract simpleStorage = new MockTargetContract();
        _createContract(address(simpleStorage));
        emit ContractCreated(address(simpleStorage), creator);
        return address(simpleStorage);
    }
}
