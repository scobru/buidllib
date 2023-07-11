// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaContract {
    struct Execution {
        address executor;
        address target;
        bytes txData;
    }

    Execution[] public executions;

    function executeFunction(
        address target,
        bytes memory txData
    ) external returns (bytes memory) {
        Execution memory execution = Execution(msg.sender, target, txData);
        executions.push(execution);

        (bool success, bytes memory result) = target.call(txData);
        require(success, "Function execution failed");
        return result;
    }
}
