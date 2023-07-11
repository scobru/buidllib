// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FeeManager is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    IERC20 public feeToken;
    address payable public feeRecipient;
    uint256 public feePercentage;

    event ERC20FeePaid(address from, address to, uint256 amount);
    event NativeFeePaid(address from, address to, uint256 amount);

    modifier costsERC20Fee(uint256 _ERC20FeeAmount) {
        require(
            feeToken.balanceOf(msg.sender) >= _ERC20FeeAmount,
            "FeeManager: Insufficient ERC20 fee balance"
        );
        require(
            feeToken.allowance(msg.sender, address(this)) >= _ERC20FeeAmount,
            "FeeManager: Fee not approved for transfer"
        );
        _;
    }

    modifier costsNativeFee() {
        uint256 fee = (msg.value * feePercentage) / 10000;
        require(
            msg.value >= fee,
            "FeeManager: Insufficient native fee balance"
        );
        _;
    }

    constructor(
        IERC20 _feeToken,
        address payable _feeRecipient,
        uint256 _feePercentage
    ) {
        require(
            _feeRecipient != address(0),
            "FeeManager: Fee recipient cannot be zero address"
        );
        require(
            _feePercentage <= 10000,
            "FeeManager: Fee percentage must be between 0 and 10000"
        );
        feeToken = _feeToken;
        feeRecipient = _feeRecipient;
        feePercentage = _feePercentage;
    }

    function setFeeToken(IERC20 _feeToken) external onlyOwner {
        require(
            address(_feeToken) != address(0),
            "FeeManager: Fee token cannot be zero address"
        );
        feeToken = _feeToken;
    }

    function setFeeRecipient(address payable _feeRecipient) external onlyOwner {
        require(
            _feeRecipient != address(0),
            "FeeManager: Fee recipient cannot be zero address"
        );
        feeRecipient = _feeRecipient;
    }

    function setFeePercentage(uint256 _feePercentage) external onlyOwner {
        require(
            _feePercentage <= 10000,
            "FeeManager: Fee percentage must be between 0 and 10000"
        );
        feePercentage = _feePercentage;
    }

    function _payERC20Fee(uint256 ERC20FeeAmount) internal {
        uint256 fee = (ERC20FeeAmount * feePercentage) / 10000;
        feeToken.transferFrom(msg.sender, feeRecipient, fee);
        emit ERC20FeePaid(msg.sender, feeRecipient, fee);
    }

    function _payNativeFee(uint256 fee) internal nonReentrant {
        (bool success, ) = feeRecipient.call{ value: fee }("");
        require(success, "FeeManager: Failed to transfer native fee");
        emit NativeFeePaid(msg.sender, feeRecipient, fee);
    }

    function payNativeFee() external payable costsNativeFee {
        uint256 fee = (msg.value * feePercentage) / 10000;
        _payNativeFee(fee);
    }

    function payERC20Fee(
        uint256 ERC20FeeAmount
    ) external costsERC20Fee(ERC20FeeAmount) {
        _payERC20Fee(ERC20FeeAmount);
    }
}
