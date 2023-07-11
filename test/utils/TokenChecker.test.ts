import { ethers } from "hardhat";
import { expect } from "chai";

describe('TokenChecker', function () {
  let accounts: { address: any; }[],
    tokenChecker: { checkERC20Balance: (arg0: any, arg1: any, arg2: any) => any; checkERC721Ownership: (arg0: any, arg1: number, arg2: any) => any; checkERC721Balance: (arg0: any, arg1: any, arg2: number) => any; checkERC1155Balance: (arg0: any, arg1: number, arg2: any, arg3: number) => any; },
    mockERC20: { address: any; },
    mockERC721: { mint: (arg0: any, arg1: number) => any; address: any; },
    mockERC1155: { mint: (arg0: any, arg1: number, arg2: number, arg3: string) => any; address: any; };

  before(async () => {
    accounts = await ethers.getSigners();

    const TokenChecker = await ethers.getContractFactory('TokenChecker');
    tokenChecker = await TokenChecker.deploy();

    const MockERC20 = await ethers.getContractFactory('MockERC20');
    mockERC20 = await MockERC20.deploy(accounts[0].address, ethers.utils.parseEther('1000'));

    const MockERC721 = await ethers.getContractFactory('MockERC721');
    mockERC721 = await MockERC721.deploy();
    await mockERC721.mint(accounts[0].address, 1);

    const MockERC1155 = await ethers.getContractFactory('MockERC1155');
    mockERC1155 = await MockERC1155.deploy();
    await mockERC1155.mint(accounts[0].address, 1, 1000, '0x');
  });

  it('Should return true if the user has enough ERC20 tokens', async function () {
    const result = await tokenChecker.checkERC20Balance(
      mockERC20.address,
      accounts[0].address,
      ethers.utils.parseEther('1')
    );
    expect(result).to.equal(true);
  });

  it('Should return false if the user does not have enough ERC20 tokens', async function () {
    const result = await tokenChecker.checkERC20Balance(
      mockERC20.address,
      accounts[0].address,
      ethers.utils.parseEther('2000')
    );
    expect(result).to.equal(false);
  });

  it('Should return true if the user owns the ERC721 token', async function () {
    const result = await tokenChecker.checkERC721Ownership(
      mockERC721.address,
      1,
      accounts[0].address
    );
    expect(result).to.equal(true);
  });

  it('Should return true if the user has enough ERC721 tokens', async function () {
    const result = await tokenChecker.checkERC721Balance(
      mockERC721.address,
      accounts[0].address,
      1
    );
    expect(result).to.equal(true);
  });

  it('Should return true if the user has enough ERC1155 tokens', async function () {
    const result = await tokenChecker.checkERC1155Balance(
      mockERC1155.address,
      1,
      accounts[0].address,
      1000
    );
    expect(result).to.equal(true);
  });

  it('Should return false if the user does not have enough ERC1155 tokens', async function () {
    const result = await tokenChecker.checkERC1155Balance(
      mockERC1155.address,
      1,
      accounts[0].address,
      2000
    );
    expect(result).to.equal(false);
  });
});
