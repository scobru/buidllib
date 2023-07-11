import { ethers } from "hardhat";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";

describe("MetaContractChecker", function () {
    let metaContract;
    let erc20Token;
    let erc721Token;
    let erc1155Token;

    const { provider } = ethers;

    const setup = async () => {
        const [owner, other] = await ethers.getSigners();

        const MetaContractCheckerFactory = await ethers.getContractFactory("MetaContractChecker");
        metaContract = await MetaContractCheckerFactory.deploy();
        await metaContract.deployed();

        const MockERC20Factory = await ethers.getContractFactory("MockERC20");
        erc20Token = await MockERC20Factory.deploy(owner.address, ethers.utils.parseEther('1000'));
        await erc20Token.deployed();

        const MockERC721Factory = await ethers.getContractFactory("MockERC721");
        erc721Token = await MockERC721Factory.deploy();
        await erc721Token.deployed();
        await erc721Token.mint(owner.address, 1);

        const MockERC1155Factory = await ethers.getContractFactory("MockERC1155");
        erc1155Token = await MockERC1155Factory.deploy();
        await erc1155Token.deployed();
        await erc1155Token.mint(owner.address, 1, parseEther('1000'), '0x');

        return { owner, other, metaContract, erc20Token, erc721Token, erc1155Token };
    };

    it("should execute function on target contract with ERC20 check", async function () {
        const { owner, metaContract, erc20Token } = await setup();

        // Deploy a mock contract to use as the target contract
        const MockContractFactory = await ethers.getContractFactory("MockTargetContract");
        const targetContract = await MockContractFactory.deploy();
        await targetContract.deployed();

        // Transfer some ERC20 tokens to the target contract
        const transferAmount = ethers.utils.parseEther("50");
        await erc20Token.transfer(targetContract.address, transferAmount);

        // Prepare the transaction data to call a function on the target contract
        const value = 42;
        const txData = targetContract.interface.encodeFunctionData("setValue", [value]);

        // Execute the function with the ERC20 balance check
        const result = await metaContract
            .connect(owner)
            .executeFunction20Check(targetContract.address, txData, erc20Token.address, owner.address, transferAmount);

        // Check the value is set correctly on the target contract
        const newValue = await targetContract.getValue();
        expect(newValue).to.equal(value);

        // Check the execution result is not equal to null
        expect(result).to.not.equal(null);
    });

    it("should execute function on target contract with ERC721 check", async function () {
        const { owner, metaContract, erc721Token } = await setup();

        // Deploy a mock contract to use as the target contract
        const MockContractFactory = await ethers.getContractFactory("MockTargetContract");
        const targetContract = await MockContractFactory.deploy();
        await targetContract.deployed();

        // Prepare the transaction data to call a function on the target contract
        const value = 42;
        const txData = targetContract.interface.encodeFunctionData("setValue", [value]);

        // Execute the function with the ERC721 ownership check
        const result = await metaContract
            .connect(owner)
            .executeFunction721Check(targetContract.address, txData, erc721Token.address, owner.address, 1);

        // Check the value is set correctly on the target contract
        const newValue = await targetContract.getValue();
        expect(newValue).to.equal(value);

        // Check the execution result is not equal to null
        expect(result).to.not.equal(null);
    });

    it("should execute function on target contract with ERC1155 check", async function () {
        const { owner, metaContract, erc1155Token } = await setup();

        // Deploy a mock contract to use as the target contract
        const MockContractFactory = await ethers.getContractFactory("MockTargetContract");
        const targetContract = await MockContractFactory.deploy();
        await targetContract.deployed();

        // Prepare the transaction data to call a function on the target contract
        const value = 42;
        const txData = targetContract.interface.encodeFunctionData("setValue", [value]);

        // Execute the function with the ERC1155 balance check
        const result = await metaContract
            .connect(owner)
            .executeFunction1155Check(
                targetContract.address,
                txData,
                erc1155Token.address,
                1,
                owner.address,
                parseEther("1")
            );

        // Check the value is set correctly on the target contract
        const newValue = await targetContract.getValue();
        expect(newValue).to.equal(value);

        // Check the execution result is not equal to null
        expect(result).to.not.equal(null);
    });
});
