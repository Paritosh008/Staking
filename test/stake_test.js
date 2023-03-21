const {ethers,network}=require("hardhat");
const{expect}=require("chai");
const { dnsEncode } = require("ethers/lib/utils");


const SECONDS_IN_A_DAY=86400;

async function moveBlocks(amount){
  console.log("Moving Blocks in hardhat network");
  for(let i=0;i<amount;i++){
    await network.provider.send("evm_mine",[])
  }
  console.log(`Moved${amount} blocks.`);
}

async function moveTime(amount){
  console.log("Moving forward in time to generate rewards");
  await network.provider.send("evm_increaseTime",[amount]);
  console.log(`Moved forward in time by ${amount} seconds`);
}

describe("Staking tests", async function(){
  let staking;
  let rewardToken;
  let deployer;
  let stakeAmount;

  beforeEach(async function(){
    const accounts=await ethers.getSigners();
    deployer=accounts[0];

    const _rewardToken=await ethers.getContractFactory("RewardToken");
    rewardToken=await _rewardToken.deploy();

    const _staking=await ethers.getContractFactory("staking");
    staking=await _staking.deploy(rewardToken.address,rewardToken.address);

    stakeAmount=ethers.utils.parseEther("10000");
  });

  it("should be able to stake tokens",async function (){
    await rewardToken.approve(staking.address,stakeAmount);
    await staking.stake(stakeAmount);

    const deployerAddress=deployer.getAddress();
    const startingEarned=await staking.earned(deployerAddress);

    console.log(`starting tokens earned in staking dapp:${startingEarned}`);
    await moveTime(SECONDS_IN_A_DAY);
    await moveBlocks(1);

    const endingEarned=await staking.earned(deployerAddress);
    console.log(`Total reward tokens earned after 24 hours lapsed:${endingEarned}`);

    expect(startingEarned).to.be.equal(0);
    expect(endingEarned).to.be.equal(8640000)
  });

});