# Hardhat FundMe(0x52d12D2758C58E0F451B346e7edC36718C40808b)

0. mkdir [project name], cd [project name]
   .env
   ETHERSCAN_API_KEY= </br>
   COINMARKETCAP_API_KEY= </br>
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/[your api key from alchemy] </br>
   PRIVATE_KEY= <br>

1. yarn init -- to initialize package.json

2. yarn add --dev hardhat

3. yarn hardhat -- to set up project

4. yard add solhint -- to install solidity linter

5. yarn solhint --init -- to initialize the linter

6. yarn solhint contracts/\*.sol -- to lint all the contracts

7. yarn -- dev @chainlink/contracts@0.8 -- to install chainlink contracts (sample aggregator not present in current chainlink package)

8. hardhat compile -- to compile

9. yarn add --dev hardhat-deploy -- package for easy deployment

10. yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers -- installing deploy-ethers the weird way

11. yarn hardhat deploy -- to run the deploy scripts

12. yarn hardhat deploy --tags mocks -- to deploy mocks

13. yarn add @nomiclabs/hardhat-waffle -- add require in hardhat.config

14. yarn hardhat deploy --tags mocks -- to run mocks

15. yarn hardhat node

16. yarn add --dev @nomicfoundation/hardhat-verify --- and add it in hardhat config

17. yarn hardhat deploy --network sepolia -- testnet deploy
