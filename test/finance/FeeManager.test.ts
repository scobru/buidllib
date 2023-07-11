import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('FeeManager', function () {
  let accounts: any[];
  let feeManager: {
    address: any;
    triggerERC20Fee: () => any;
    triggerNativeFee: (arg0: { value: any }) => any;
  };
  let mockERC20: { address: any; approve: (arg0: any, arg1: any) => any };

  before(async () => {
    accounts = await ethers.getSigners();

    const MockERC20 = await ethers.getContractFactory('MockERC20');
    mockERC20 = await MockERC20.deploy(
      accounts[0].address,
      ethers.utils.parseEther('1000')
    );

    const MockConcreteFeeManager = await ethers.getContractFactory(
      'MockConcreteFeeManager'
    );
    feeManager = await MockConcreteFeeManager.deploy(
      mockERC20.address,
      ethers.utils.parseEther('0.01'),
      ethers.utils.parseEther('0.01'),
      accounts[1].address
    );
  });

  it('Should pay ERC20 fee', async function () {
    await mockERC20.approve(
      feeManager.address,
      ethers.utils.parseEther('0.01')
    );
    await expect(feeManager.triggerERC20Fee()).to.emit(
      feeManager,
      'ERC20FeePaid'
    );
  });

  it('Should pay native fee', async function () {
    await expect(() =>
      feeManager.triggerNativeFee({ value: ethers.utils.parseEther('0.01') })
    ).to.changeEtherBalance(accounts[1], ethers.utils.parseEther('0.01'));
    await expect(
      feeManager.triggerNativeFee({ value: ethers.utils.parseEther('0.01') })
    ).to.emit(feeManager, 'NativeFeePaid');
  });
});
