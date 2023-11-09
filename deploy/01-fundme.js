const { network, run } = require("hardhat")


const {networkConfig, developmentChains} = require("../helper-hardhat-config")
const {verify} = require("../utils/verify")
const {blockwait} = require("../utils/blockwait")
module.exports = async ({getNamedAccounts, deployments}) => {

    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId
    console.log("Chainid:---------------"+chainId)
    let ethUsdPriceFeedAddress
    if(chainId == 31337){
        console.log("Local network detected. Deploying mocks...");
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
        console.log(`Mock Deployed at ${ethUsdPriceFeedAddress}`);
        console.log("--------------------------------");
    }else{
         ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    //on localhost i can use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe",{

        from: deployer,
        args: [ethUsdPriceFeedAddress] ,//price feed address,
        log: true,

    })
    //if (chainId != 31337){} 
    console.log("------------------------")
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API){
        await blockwait(3)
        await verify(fundMe.address, args)

    }
}

module.exports.tags = ["all","fundme"]