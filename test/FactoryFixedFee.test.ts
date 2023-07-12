import { ethers } from 'hardhat';
import { expect } from 'chai';

describe("FactoryFixedFee", function () {
    const setup = async () => {
        const Factory = await ethers.getContractFactory("MockFactoryFixedFee");
        const SimpleStorage = await ethers.getContractFactory("MockTargetContract");
        const [owner, addr1] = await ethers.getSigners();
        const factory = await Factory.deploy(owner.address, 100);
        await factory.deployed();
        const simpleStorage = await SimpleStorage.deploy();
        await simpleStorage.deployed();
        return { owner, addr1, factory, simpleStorage };
    };

    it("Should set the correct initial fixed fee", async function () {
        const { factory } = await setup();
        expect(await factory.getCreationFee()).to.equal(100);
    });

    it("Should allow the owner to change the fixed fee", async function () {
        const { factory } = await setup();
        await factory.setFixedFee(200);
        expect(await factory.getCreationFee()).to.equal(200);
    });

    it("Should correctly create a new contract", async function () {
        const { factory, owner } = await setup();
        await factory.createContract(owner.address, { value: 100 });
        const contracts = await factory.getContracts();
        expect(contracts.length).to.equal(1);
    });

    it("Should revert if creation fee is incorrect", async function () {
        const { factory, owner } = await setup();
        await expect(factory.createContract(owner.address)).to.be.revertedWith(
            "fee is not correct"
        );
    });

    it("Should allow the owner to deactivate and activate a contract", async function () {
        const { factory, owner } = await setup();
        await factory.createContract(owner.address, { value: 100 });
        const contracts = await factory.getContracts();
        const contractAddress = contracts[0];
        await factory.deactivateContract(contractAddress);
        expect(await factory.isContractCreated(contractAddress)).to.equal(false);
        await factory.activateContract(contractAddress);
        expect(await factory.isContractCreated(contractAddress)).to.equal(true);
    });

    it("Should revert if non-owner tries to deactivate or activate a contract", async function () {
        const { factory, owner, addr1 } = await setup();
        await factory.createContract(owner.address, { value: 100 });
        const contracts = await factory.getContracts();
        const contractAddress = contracts[0];
        const factoryFromAddr1 = factory.connect(addr1);
        await expect(factoryFromAddr1.deactivateContract(contractAddress)).to.be.revertedWith(
            "Ownable: caller is not the owner"
        );
        await expect(factoryFromAddr1.activateContract(contractAddress)).to.be.revertedWith(
            "Ownable: caller is not the owner"
        );
    });
});
