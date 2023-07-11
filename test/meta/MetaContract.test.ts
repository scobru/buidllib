
import { ethers } from "hardhat";
import { expect } from "chai";
import { MetaContract } from "../../typechain-types";
import { MockTargetContract } from "../../typechain-types";




describe("MetaContract", function () {
    let metaContract: MetaContract;
    let targetContract: MockTargetContract;

    const { provider } = ethers;

    const setup = async () => {
        const [signer, other] = await ethers.getSigners();

        const MetaContractFactory = await ethers.getContractFactory("MetaContract");
        metaContract = await MetaContractFactory.deploy();
        await metaContract.deployed();

        const TargetContractMockFactory = await ethers.getContractFactory("MockTargetContract");
        targetContract = await TargetContractMockFactory.deploy();
        await targetContract.deployed();

        return { signer, other, metaContract, targetContract };
    };


    it("should execute function on target contract", async function () {

        const { signer, metaContract, targetContract } = await setup();

        const value = 42;
        const txData = targetContract.interface.encodeFunctionData("setValue", [value]);

        const result = await metaContract.executeFunction(targetContract.address, txData);

        const newValue = await targetContract.getValue();
        expect(newValue).to.equal(value);
        expect(result).to.not.equal(null);
    });
});
