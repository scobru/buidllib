// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract TokenChecker {
    function userHasERC20(
        address tokenAddress,
        address userAddress,
        uint256 minBalance
    ) public view returns (bool) {
        return IERC20(tokenAddress).balanceOf(userAddress) >= minBalance;
    }

    function userOwnsERC721(
        address tokenAddress,
        uint256 tokenId,
        address userAddress
    ) public view returns (bool) {
        return IERC721(tokenAddress).ownerOf(tokenId) == userAddress;
    }

    function userHasERC721(
        address tokenAddress,
        address userAddress,
        uint256 minAmount
    ) public view returns (bool) {
        return IERC721(tokenAddress).balanceOf(userAddress) >= minAmount;
    }

    function userHasERC1155(
        address tokenAddress,
        uint256 tokenId,
        address userAddress,
        uint256 minBalance
    ) public view returns (bool) {
        return
            IERC1155(tokenAddress).balanceOf(userAddress, tokenId) >=
            minBalance;
    }
}
