// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../utils/TokenChecker.sol";

contract MetaContractChecker is Ownable, TokenChecker {
    struct Execution {
        address executor;
        address target;
        bytes txData;
    }

    Execution[] public executions;

    function executeFunction721Check(
        address target,
        bytes memory txData,
        address tokenAddress,
        address accountAddress,
        uint256 minAmount
    )
        external
        requireERC721Balance(tokenAddress, accountAddress, minAmount)
        returns (bytes memory)
    {
        Execution memory execution = Execution(msg.sender, target, txData);
        executions.push(execution);

        (bool success, bytes memory result) = target.call(txData);
        require(success, "Function execution failed");
        return result;
    }

    function executeFunction20Check(
        address target,
        bytes memory txData,
        address tokenAddress,
        address accountAddress,
        uint256 minAmount
    )
        external
        requireERC20Balance(tokenAddress, accountAddress, minAmount)
        returns (bytes memory)
    {
        Execution memory execution = Execution(msg.sender, target, txData);
        executions.push(execution);

        (bool success, bytes memory result) = target.call(txData);
        require(success, "Function execution failed");
        return result;
    }

    function executeFunction1155Check(
        address target,
        bytes memory txData,
        address tokenAddress,
        uint256 tokenId,
        address accountAddress,
        uint256 minAmount
    )
        external
        requireERC1155Balance(tokenAddress, tokenId, accountAddress, minAmount)
        returns (bytes memory)
    {
        Execution memory execution = Execution(msg.sender, target, txData);
        executions.push(execution);

        (bool success, bytes memory result) = target.call(txData);
        require(success, "Function execution failed");
        return result;
    }
}
