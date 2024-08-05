const { assert, expect, chai } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../../helper-hardhat-config")
//const { solidity } = require("ethereum-waffle")
//chai.use(solidity)

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", function () {
      let fundMe
      let mockV3Aggregator
      let deployer = []
      let pricefeed = []
      const sendValue = ethers.parseEther("1")
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        const fundMeDeployment = await deployments.get("FundMe")
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address)

        const mockV3AggregatorDeployment = await deployments.get(
          "MockV3Aggregator"
        )
        mockV3Aggregator = await ethers.getContractAt(
          "MockV3Aggregator",
          mockV3AggregatorDeployment.address
        )
      })

      describe("constructor", function () {
        it("sets the aggregator addresses correctly", async () => {
          const response = await fundMe.s_priceFeed({})
          assert.equal(response, mockV3Aggregator.target)
        })
      })
      describe("fund", function () {
        it("fails if you send don't enough eth", async () => {
          await expect(fundMe.fund()).to.be.reverted
        })
        it("sends eth", async () => {
          await fundMe.fund({ value: sendValue })
          const response = await fundMe.s_addressToAmountFunded(deployer)
          assert.equal(response.toString(), sendValue.toString())
        })
      })
    })
