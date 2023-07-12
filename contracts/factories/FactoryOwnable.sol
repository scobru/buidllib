// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract FactoryOwnable is Ownable {
    struct ContractInfo {
        address contractAddress;
        address creator;
        bool isActive;
    }
    uint256 public contractCounter;
    address[] public contracts;

    mapping(address => ContractInfo) public createdContracts;

    event ContractCreated(
        address indexed contractAddress,
        address indexed creator
    );

    constructor(address _owner) {
        _transferOwnership(_owner);
    }

    function _createContract(
        address _contractAddress
    ) internal returns (address) {
        require(msg.sender == owner(), "Only owner can create contracts");
        contractCounter++;
        contracts.push(_contractAddress);

        createdContracts[_contractAddress] = ContractInfo({
            contractAddress: _contractAddress,
            creator: msg.sender,
            isActive: true
        });

        emit ContractCreated(_contractAddress, msg.sender);
        return _contractAddress;
    }

    function createContract(address creator) public virtual returns (address);

    function getContracts() public view returns (address[] memory) {
        return contracts;
    }

    function getContractsOwnedBy(
        address owner
    ) public view returns (address[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < contracts.length; i++) {
            if (createdContracts[contracts[i]].creator == owner) {
                count++;
            }
        }
        address[] memory ownedContracts = new address[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < contracts.length; i++) {
            if (createdContracts[contracts[i]].creator == owner) {
                ownedContracts[j] = contracts[i];
                j++;
            }
        }
        return ownedContracts;
    }

    function deactivateContract(address contractAddress) public onlyOwner {
        createdContracts[contractAddress].isActive = false;
    }

    function activateContract(address contractAddress) public onlyOwner {
        createdContracts[contractAddress].isActive = true;
    }

    function isContractCreated(
        address contractAddress
    ) public view returns (bool) {
        return createdContracts[contractAddress].isActive;
    }

    receive() external payable {}
}
