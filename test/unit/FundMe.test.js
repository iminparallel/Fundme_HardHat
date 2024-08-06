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
        it("Adds funder to array of funders", async () => {
          await fundMe.fund({ value: sendValue })
          const response = await fundMe.s_funders(0)
          assert.equal(response, deployer)
        })
      })
      describe("withdraw", function () {
        beforeEach(async () => {
          await fundMe.fund({ value: sendValue })
        })
        // arrange, act, assert
        it("withdraws ETH from a single funder", async () => {
          // Arrange
          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          )
          const startingDeployerBalance = await ethers.provider.getBalance(
            deployer
          )

          // Act
          const transactionResponse = await fundMe.withdraw()
          const transactionReceipt = await transactionResponse.wait(1)
          const { gasUsed, gasPrice } = transactionReceipt
          const gasCost = BigInt(gasUsed) * BigInt(gasPrice)

          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          )
          const endingDeployerBalance = await ethers.provider.getBalance(
            deployer
          )

          // Assert
          assert.equal(endingFundMeBalance, 0)
          assert.equal(
            (startingFundMeBalance + startingDeployerBalance).toString(),
            (endingDeployerBalance + gasCost).toString()
          )
        })
        it("is allows us to withdraw with multiple funders", async () => {
          // Arrange
          const accounts = await ethers.getSigners()
          for (i = 1; i < 6; i++) {
            const fundMeConnectedContract = await fundMe.connect(accounts[i])
            await fundMeConnectedContract.fund({ value: sendValue })
          }
          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          )
          const startingDeployerBalance = await ethers.provider.getBalance(
            deployer
          )

          // Act
          const transactionResponse = await fundMe.withdraw()
          // Let's comapre gas costs :)
          // const transactionResponse = await fundMe.withdraw()
          const transactionReceipt = await transactionResponse.wait()
          const { gasUsed, gasPrice } = transactionReceipt
          const withdrawGasCost = BigInt(gasUsed) * BigInt(gasPrice)

          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          )
          const endingDeployerBalance = await ethers.provider.getBalance(
            deployer
          )
          // Assert
          assert.equal(
            (startingFundMeBalance + startingDeployerBalance).toString(),
            (endingDeployerBalance + withdrawGasCost).toString()
          )
          // Make a getter for storage variables
          await expect(fundMe.s_funders(0)).to.be.reverted

          for (i = 1; i < 6; i++) {
            assert.equal(
              await fundMe.s_addressToAmountFunded(accounts[i].address),
              0
            )
          }
        })
        it("Only allows the owner to withdraw", async function () {
          const accounts = await ethers.getSigners()
          const fundMeConnectedContract = await fundMe.connect(accounts[1])
          await expect(fundMeConnectedContract.withdraw()).to.be.reverted
        })
      })
    })
