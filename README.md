# @scobru/buidllib

Welcome to BuidlLib! This is a comprehensive library of smart contract utilities to assist in the development of Ethereum based applications.

## Features

### contract/utils

- **TokenChecker:** A utility contract that allows checking if a user holds or owns a certain amount of ERC20, ERC721 or ERC1155 tokens.

### contract/finance

- **Treasury:** A utility contract that allows withdrawing ERC20 and native Ether (ETH) tokens from a contract. This is useful for contracts that receive tokens and need to withdraw them to a specific address.

## Installation

You can install the library via npm:

```bash
npm install @scobru/buidllib
```

## Usage

### TokenChecker

Here is how you can use the TokenChecker contract:


```solidity
pragma solidity ^0.8.19;

import "@scobru/buidllib/contracts/utils/TokenChecker.sol";

contract MyContract is TokenChecker {
    // Puoi definire un indirizzo di token specifico e un saldo minimo per questo contratto
    address constant tokenAddress = 0xYourTokenAddress;
    uint256 constant minBalance = 1000;

    // Puoi verificare direttamente il saldo del token dell'utente utilizzando le funzioni di TokenChecker
    function checkUserERC20Balance(address userAddress) public view returns (bool) {
        return checkERC20Balance(tokenAddress, userAddress, minBalance);
    }

    // E in modo simile per ERC721 e ERC1155
    function checkUserERC721Ownership(address userAddress, uint256 tokenId) public view returns (bool) {
        return checkERC721Ownership(tokenAddress, tokenId, userAddress);
    }

    function checkUserERC1155Balance(address userAddress, uint256 tokenId) public view returns (bool) {
        return checkERC1155Balance(tokenAddress, tokenId, userAddress, minBalance);
    }
}

```

### Treasury

Here is how you can use the TokenChecker contract:


```solidity
pragma solidity ^0.8.19;

import "@scobru/buidllib/contracts/finance/Treasury.sol";

contract MyContract is Treasury {
    // Example implementation using Treasury
    
    // Function to withdraw tokens from the Treasury contract
    function withdrawTokensFromTreasury(address _token, address _to, uint256 _amount) public onlyOwner {
        withdrawTokens(_token, _to, _amount);
    }
    
    // Function to withdraw native Ether (ETH) from the Treasury contract
    function withdrawNativeFromTreasury(address payable _to, uint256 _amount) public onlyOwner {
        withdrawNative(_to, _amount);
    }
    
    // Function to receive Ether in the contract
    receive() external payable {
        // Custom logic for handling received Ether
    }    
}
```

## Future Development

We aim to expand this library with more utility contracts in the future. Keep an eye on our release notes and documentation for updates.

## Contributing

We welcome contributions from the community. Here are steps to get started:

1. Fork this repository.
2. Create a new branch on your forked repository.
3. Submit your changes through a pull request from your new branch to the main branch of the original repository.

Before making a pull request, please make sure your changes are well-documented and include relevant tests. 

## License

This project is licensed under the MIT License. Check out the LICENSE file in the root directory for more details.


