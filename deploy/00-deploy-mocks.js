const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const DECIMALS = 8
//const DECIMALS_BIG = ethers.BigNumber.from(DECIMALS.toString());
const INITIAL_ANSWER = 200000000000
//const INITIAL_ANSWER_BIG = ethers.BigNumber.from(INITIAL_ANSWER.toString());
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        //log("local network detected.deploying mocks")
        const mock = await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        //log("Mock Deployed...")
        //log("--------------------------------")
        //log(`Deployed at ${mock.address}`);
        //log("--------------------------------");
    }
}

module.exports.tags = ["all", "mocks"]
