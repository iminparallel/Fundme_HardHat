const { assert } = require("chai")
const { network, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

console.log(developmentChains, network.name)
/*!developmentChains.includes(network.name)
  ? describe.skip
  :*/
describe("FundMe", function () {
  let fundMe
  let deployer = []
  let pricefeed = []
  const sendValue = ethers.parseEther("0.01")
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer
    await deployments.fixture(["all"])

    const fundMeDeployment = await deployments.get("FundMe")
    fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address)
    console.log(fundMe.target)
  })
  it("allows people to fund and withdraw", async function () {
    const fundTxResponse = await fundMe.fund({ value: sendValue })
    await fundTxResponse.wait(1)
    const withdrawTxResponse = await fundMe.withdraw()
    await withdrawTxResponse.wait(1)

    const endingFundMeBalance = await ethers.provider.getBalance(fundMe.target)
    console.log(
      endingFundMeBalance.toString() +
        " should equal 0, running assert equal..."
    )
    assert.equal(endingFundMeBalance.toString(), "0")
  })
})
