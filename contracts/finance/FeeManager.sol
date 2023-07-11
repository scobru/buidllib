// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract FeeManager is Ownable {
    uint256 public ERC20FeeAmount;
    uint256 public nativeFeeAmount;
    IERC20 public feeToken;
    address payable public feeRecipient;

    event ERC20FeePaid(address from, address to, uint256 amount);
    event NativeFeePaid(address from, address to, uint256 amount);

    modifier costsERC20Fee() {
        require(
            feeToken.balanceOf(msg.sender) >= ERC20FeeAmount,
            "Insufficient ERC20 fee balance"
        );
        require(
            feeToken.allowance(msg.sender, address(this)) >= ERC20FeeAmount,
            "Fee not approved for transfer"
        );
        _;
        _payERC20Fee();
    }

    modifier costsNativeFee() {
        require(
            msg.value >= nativeFeeAmount,
            "Insufficient native fee balance"
        );
        _;
        _payNativeFee();
    }

    constructor(
        IERC20 _feeToken,
        uint256 _ERC20FeeAmount,
        uint256 _nativeFeeAmount,
        address payable _feeRecipient
    ) {
        require(
            _feeRecipient != address(0),
            "Fee recipient cannot be zero address"
        );
        feeToken = _feeToken;
        ERC20FeeAmount = _ERC20FeeAmount;
        nativeFeeAmount = _nativeFeeAmount;
        feeRecipient = _feeRecipient;
    }

    function setERC20FeeAmount(uint256 _ERC20FeeAmount) external onlyOwner {
        ERC20FeeAmount = _ERC20FeeAmount;
    }

    function setNativeFeeAmount(uint256 _nativeFeeAmount) external onlyOwner {
        nativeFeeAmount = _nativeFeeAmount;
    }

    function setFeeToken(IERC20 _feeToken) external onlyOwner {
        require(
            address(_feeToken) != address(0),
            "Fee token cannot be zero address"
        );
        feeToken = _feeToken;
    }

    function setFeeRecipient(address payable _feeRecipient) external onlyOwner {
        require(
            _feeRecipient != address(0),
            "Fee recipient cannot be zero address"
        );
        feeRecipient = _feeRecipient;
    }

    function _payERC20Fee() internal {
        feeToken.transferFrom(msg.sender, feeRecipient, ERC20FeeAmount);
        emit ERC20FeePaid(msg.sender, feeRecipient, ERC20FeeAmount);
    }

    function _payNativeFee() internal {
        payable(feeRecipient).transfer(nativeFeeAmount);
        emit NativeFeePaid(msg.sender, feeRecipient, nativeFeeAmount);
    }
}
