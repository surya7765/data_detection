const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProfileImageNfts", function () {
  it("Should return the new greeting once it's changed", async function () {
    const ProfileImageNfts = await ethers.getContractFactory(
      "ProfileImageNfts"
    );
    const profileImageNfts = await Greeter.deploy("Hello, world!");
    await profileImageNfts.deployed();

    expect(await profileImageNfts.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
