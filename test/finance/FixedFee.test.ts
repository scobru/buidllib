const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FixedFee", function () {
    let FixedFee, fixedFee: { deployed: () => any; getFixedFee: () => any; setFixedFee: (arg0: number) => any; connect: (arg0: any) => any; }, owner, addr1: any;

    beforeEach(async function () {
        FixedFee = await ethers.getContractFactory("FixedFee");
        [owner, addr1] = await ethers.getSigners();
        fixedFee = await FixedFee.deploy(100);
        await fixedFee.deployed();
    });

    it("Should set the correct initial fixed fee", async function () {
        expect(await fixedFee.getFixedFee()).to.equal(100);
    });

    it("Should allow the owner to change the fixed fee", async function () {
        await fixedFee.setFixedFee(200);
        expect(await fixedFee.getFixedFee()).to.equal(200);
    });

    it("Should emit FixedFeeChanged event when fixed fee is changed", async function () {
        await expect(fixedFee.setFixedFee(300))
            .to.emit(fixedFee, "FixedFeeChanged")
            .withArgs(300);
    });

    it("Should not allow non-owner to change the fixed fee", async function () {
        const fixedFeeFromAddr1 = fixedFee.connect(addr1);
        await expect(fixedFeeFromAddr1.setFixedFee(400)).to.be.revertedWith(
            "Ownable: caller is not the owner"
        );
    });
});
