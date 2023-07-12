// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../factories/Factory.sol";
import "./mockTargetContract.sol";

contract MockFactory is Factory {
    constructor(address _owner) Factory(_owner) {}

    function _createContract(
        address creator
    ) internal override returns (address) {
        MockTargetContract simpleStorage = new MockTargetContract();
        emit ContractCreated(address(simpleStorage), creator);
        return address(simpleStorage);
    }
}
