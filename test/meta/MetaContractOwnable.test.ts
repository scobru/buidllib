import { ethers } from 'hardhat';
import { expect } from 'chai';
import { MetaContractOwnable } from '../../typechain-types';
import { MockTargetContract } from '../../typechain-types';

describe('MetaContractOwnable', function () {
  let metaContract: MetaContractOwnable;
  let targetContract: MockTargetContract;

  const { provider } = ethers;

  const setup = async () => {
    const [owner, other] = await ethers.getSigners();

    const MetaContractOwnableFactory = await ethers.getContractFactory(
      'MetaContractOwnable'
    );
    metaContract = await MetaContractOwnableFactory.deploy();
    await metaContract.deployed();

    const TargetContractMockFactory = await ethers.getContractFactory(
      'MockTargetContract'
    );
    targetContract = await TargetContractMockFactory.deploy();
    await targetContract.deployed();

    return { owner, other, metaContract, targetContract };
  };

  it('should execute function on target contract by the owner', async function () {
    const { owner, metaContract, targetContract } = await setup();

    const value = 42;
    const txData = targetContract.interface.encodeFunctionData('setValue', [
      value,
    ]);

    const result = await metaContract
      .connect(owner)
      .executeFunction(targetContract.address, txData);

    const newValue = await targetContract.getValue();
    expect(newValue).to.equal(value);
    expect(result).to.not.equal(null);
  });

  it('should revert when executing function by a non-owner', async function () {
    const { owner, other, metaContract, targetContract } = await setup();

    const value = 42;
    const txData = targetContract.interface.encodeFunctionData('setValue', [
      value,
    ]);

    await expect(
      metaContract
        .connect(other)
        .executeFunction(targetContract.address, txData)
    ).to.be.revertedWith('Ownable: caller is not the owner');
  });
});
