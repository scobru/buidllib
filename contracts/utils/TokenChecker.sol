// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract TokenChecker {
    modifier requireERC20Balance(
        address tokenAddress,
        address accountAddress,
        uint256 minBalance
    ) {
        require(
            _hasERC20Balance(tokenAddress, accountAddress, minBalance),
            "TokenChecker: Insufficient ERC20 token balance"
        );
        _;
    }

    modifier requireERC721Ownership(
        address tokenAddress,
        uint256 tokenId,
        address accountAddress
    ) {
        require(
            _hasERC721Ownership(tokenAddress, tokenId, accountAddress),
            "TokenChecker: Account does not own the ERC721 token"
        );
        _;
    }

    modifier requireERC721Balance(
        address tokenAddress,
        address accountAddress,
        uint256 minAmount
    ) {
        require(
            _hasERC721Balance(tokenAddress, accountAddress, minAmount),
            "TokenChecker: Insufficient ERC721 token quantity"
        );
        _;
    }

    modifier requireERC1155Balance(
        address tokenAddress,
        uint256 tokenId,
        address accountAddress,
        uint256 minBalance
    ) {
        require(
            _hasERC1155Balance(
                tokenAddress,
                tokenId,
                accountAddress,
                minBalance
            ),
            "TokenChecker: Insufficient ERC1155 token balance"
        );
        _;
    }

    function checkERC20Balance(
        address tokenAddress,
        address accountAddress,
        uint256 minBalance
    ) public view returns (bool) {
        return _hasERC20Balance(tokenAddress, accountAddress, minBalance);
    }

    function checkERC721Ownership(
        address tokenAddress,
        uint256 tokenId,
        address accountAddress
    ) public view returns (bool) {
        return _hasERC721Ownership(tokenAddress, tokenId, accountAddress);
    }

    function checkERC721Balance(
        address tokenAddress,
        address accountAddress,
        uint256 minAmount
    ) public view returns (bool) {
        return _hasERC721Balance(tokenAddress, accountAddress, minAmount);
    }

    function checkERC1155Balance(
        address tokenAddress,
        uint256 tokenId,
        address accountAddress,
        uint256 minBalance
    ) public view returns (bool) {
        return
            _hasERC1155Balance(
                tokenAddress,
                tokenId,
                accountAddress,
                minBalance
            );
    }

    function _hasERC20Balance(
        address tokenAddress,
        address accountAddress,
        uint256 minBalance
    ) internal view returns (bool) {
        return IERC20(tokenAddress).balanceOf(accountAddress) >= minBalance;
    }

    function _hasERC721Ownership(
        address tokenAddress,
        uint256 tokenId,
        address accountAddress
    ) internal view returns (bool) {
        IERC721 tokenContract = IERC721(tokenAddress);
        return tokenContract.ownerOf(tokenId) == accountAddress;
    }

    function _hasERC721Balance(
        address tokenAddress,
        address accountAddress,
        uint256 minAmount
    ) internal view returns (bool) {
        IERC721 tokenContract = IERC721(tokenAddress);
        return tokenContract.balanceOf(accountAddress) >= minAmount;
    }

    function _hasERC1155Balance(
        address tokenAddress,
        uint256 tokenId,
        address accountAddress,
        uint256 minBalance
    ) internal view returns (bool) {
        return
            IERC1155(tokenAddress).balanceOf(accountAddress, tokenId) >=
            minBalance;
    }
}
