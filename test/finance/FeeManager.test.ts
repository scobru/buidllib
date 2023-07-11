import { ethers, } from 'hardhat';
import { expect } from 'chai';

const { provider } = ethers;

describe('FeeManager', () => {
  const initialSupply = ethers.utils.parseEther('1000');
  const feePercentage = 1000; // 10%

  const setup = async (mode: string) => {
    const [signer, other] = await ethers.getSigners();

    const Token = await ethers.getContractFactory('MockERC20');
    const token = await Token.deploy(
      signer.address,
      initialSupply
    );

    const FeeManager = await ethers.getContractFactory('FeeManager');
    let feeManager: any;

    if (mode == 'native') {
      feeManager = await FeeManager.deploy(
        ethers.constants.AddressZero,
        signer.address,
        feePercentage
      );
      await feeManager.deployed()

    } else if (mode == 'erc20') {
      feeManager = await FeeManager.deploy(
        token.address,
        signer.address,
        feePercentage
      );
      await feeManager.deployed()
    }

    return { signer, other, token, feeManager };
  };


  it('pays native fee correctly', async () => {
    const { signer, other, feeManager } = await setup('native');

    const initialBalance = await provider.getBalance(other.address);
    const initialBalanceSigner = await provider.getBalance(signer.address);

    // User1 pays fee
    const tx = await feeManager.connect(other).payNativeFee({ value: ethers.utils.parseEther('1') });

    const txReceipt = await tx.wait();
    const gasUsed = txReceipt.gasUsed.mul(tx.gasPrice);

    // Fee calculation
    const fee = ethers.utils.parseEther('1').mul(feePercentage).div(10000);

    const amountSubFee = Number(ethers.utils.parseEther('1')) * feePercentage / 10000;

    // Check new balance
    const expectedBalance = initialBalance.sub(ethers.utils.parseEther('1')).sub(gasUsed);
    expect(await provider.getBalance(other.address)).to.equal(expectedBalance);

    // Check feeRecipient's balance
    expect(await provider.getBalance(signer.address)).to.equal(String(initialBalanceSigner.add(String(amountSubFee))));
  });

  it('pays ERC20 fee correctly', async () => {
    const { signer, other, token, feeManager } = await setup('erc20');

    // Transfer some tokens to 'other' address
    const initialBalance = await token.balanceOf(signer.address)
    await token.transfer(other.address, initialBalance);

    // Approve feeManager to spend 'other' tokens
    const feeAmount = ethers.utils.parseEther('2');
    await token.connect(other).approve(feeManager.address, feeAmount);

    // Other pays ERC20 fee
    await feeManager.connect(other).payERC20Fee(feeAmount);

    // Fee calculation
    const fee = feeAmount.mul(feePercentage).div(10000);

    // Check 'other' balance
    const expectedBalance = initialBalance.sub(fee);
    expect(await token.balanceOf(other.address)).to.equal(expectedBalance);

    // Check feeRecipient's balance
    expect(await token.balanceOf(signer.address)).to.equal(fee);
  });



});
