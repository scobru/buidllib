// MockConcreteFeeManager.sol

pragma solidity ^0.8.0;

import "../finance/FeeManager.sol";

contract MockConcreteFeeManager is FeeManager {
    constructor(
        IERC20 _feeToken,
        uint256 _ERC20FeeAmount,
        uint256 _nativeFeeAmount,
        address payable _feeRecipient
    ) FeeManager(_feeToken, _ERC20FeeAmount, _nativeFeeAmount, _feeRecipient) {}

    // Trigger the costsERC20Fee and costsNativeFee modifiers for testing
    function triggerERC20Fee() external costsERC20Fee {
        // No additional logic needed, this is just for testing the modifier
    }

    function triggerNativeFee() external payable costsNativeFee {
        // No additional logic needed, this is just for testing the modifier
    }
}
