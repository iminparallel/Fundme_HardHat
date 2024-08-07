const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
  const { deployer } = await getNamedAccounts()
  const fundMeDeployment = await deployments.get("FundMe")
  fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address)
  console.log(`Got contract FundMe at ${fundMe.target}`)
  console.log("Funding contract...")
  const transactionResponse = await fundMe.fund({
    value: ethers.parseEther("0.1"),
  })
  await transactionResponse.wait(1)
  console.log("Funded!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
