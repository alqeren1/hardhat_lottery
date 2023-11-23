const { ethers } = require("hardhat");
const fs = require("fs");
const FRONTEND_ADDRESSES_FILE = "../nextjs/constants/contractAddresses.json";
const FRONTEND_ABI_FILE = "../nextjs/constants/abi.json";
module.exports = async function () {
  if (process.env.UPDATE_FRONTEND) {
    console.log("Updating frontend...");
    updateContractAddresses();
    updateContractABI();
  }
};
async function updateContractABI() {
  const raffle = await ethers.getContract("Raffle");
  fs.writeFileSync(
    FRONTEND_ABI_FILE,
    JSON.stringify(raffle.interface.format("json"))
  );
}

async function updateContractAddresses() {
  const raffle = await deployments.get("Raffle");
  const raffleAddress = await raffle.address;
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf8")
  );

  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(raffleAddress)) {
      currentAddresses[chainId].push(raffleAddress);
    }
  } else {
    currentAddresses[chainId] = [raffleAddress];
  }
  fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

module.exports.tags = ["all", "frontend"];
