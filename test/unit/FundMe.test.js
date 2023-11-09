const { deployments, getNamedAccounts, ethers, network } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

//sadece local chain testi
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", function () {
          let fundMe
          let deployer
          let mockV3Aggregator
          let balance
          let alienAccount
          //const sendValue = 1 * 10 ** 18
          const sendValue = ethers.parseEther("1")
          beforeEach(async function () {
              // Get the account to deploy the contracts with
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              alienAccount = accounts[1]
              // Deploy all contracts using the tags specified in the deployment scripts
              await deployments.fixture(["all"])

              // Get the contract instances
              // ethers.getContract returns a contract instance connected to the first signer by default,
              // which is usually the deployer when using `getNamedAccounts`
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await deployments.get("MockV3Aggregator")
          })

          describe("constructor", function () {
              it("Sets the aggregator addresses correctly", async function () {
                  // Call the getPriceFeed function from the FundMe contract
                  const response = await fundMe.getPriceFeed()
                  // Use expect from Chai for assertions as it provides more informative error messages
                  assert.equal(response, mockV3Aggregator.address)
              })
          })
          describe("fund", async function () {
              it("Fails if you don't send enough ETH", async function () {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "You need to spend more ETH!"
                  )
              })

              it("Updated the amount funded data structure", async function () {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getAddresstoAmountFunded(
                      deployer
                  )
                  assert.equal(response.toString(), sendValue.toString())
              })
              it("Adds getFunder to arrays of it", async function () {
                  await fundMe.fund({ value: sendValue })
                  const funder = await fundMe.getFunder(0)
                  assert.equal(funder, await deployer.address)
              })
          })

          describe("withdraw", async function () {
              beforeEach(async function () {
                  await fundMe.fund({ value: sendValue })
              })

              it("Owner withdraws the money with a single funder", async function () {
                  //balance = await ethers.provider.getBalance(fundMe)

                  await fundMe.withdraw()
                  //const owner = await fundMe.i_owner()

                  balance = await ethers.provider.getBalance(fundMe)
                  //await console.log("Value:" + ethers.formatEther(balance))
                  assert.equal(balance.toString(), "0")
              })
              it("Owner withdraws the money with multiple getFunder", async function () {
                  const account = await ethers.getSigners()

                  for (i = 1; i < 7; i++) {
                      const connecting = await fundMe.connect(account[i])

                      await connecting.fund({ value: sendValue })
                  }

                  const ownerconnect = await fundMe.connect(deployer)

                  await ownerconnect.withdraw()
                  //balance = await ethers.provider.getBalance(fundMe)

                  //await console.log("Value:" + balance)

                  assert.equal(balance.toString(), "0")
              })
              it("Public can't withdraw the money", async function () {
                  const fundMeConnect = fundMe.connect(alienAccount)
                  //await fundMeConnect.withdraw()
                  await expect(fundMeConnect.withdraw()).to.be.reverted
              })
          })
          // Add more tests as needed
      })
