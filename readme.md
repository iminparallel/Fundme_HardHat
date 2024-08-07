# Hardhat FundMe

0. mkdir [project name], cd [project name]</br>
   .env </br>
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

12. yarn add @nomiclabs/hardhat-waffle -- add require in hardhat.config

13. yarn hardhat deploy --tags mocks -- to run mocks

14. yarn hardhat node

15. yarn add --dev @nomicfoundation/hardhat-verify --- and add it in hardhat config

16. yarn hardhat deploy --network sepolia -- testnet deploy

17. yarn hardhat test -- to run test

18. yarn add --dev @nomicfoundation/hardhat-toolbox -- because revertedWith not working

19. yarn add --dev @nomicfoundation/hardhat-chai-matchers @types/chai @types/mocha ts-node typescript

20. 18, 19 conflict with @nomiclabs/hardhat-waffle

21. yarn add --dev ethereum-waffle --> this will not work @nomicfoundation/hardhat-toolbox is the way
    deps:
    "@nomicfoundation/hardhat-chai-matchers@^2.0.0" "@typechain/ethers-v6@^0.5.0" "@typechain/hardhat@^9.0.0" "@types/chai@^4.2.0" "@types/mocha@>=9.1.0" "ts-node@>=8.0.0" "typescript@>=4.5.0" -- hardhat-toolbox dependencies
22. Ways to make a contract cheaper:
    i. avoid reading and writing from storage variables as much as possible
    ii. there's something about private variables and declaring functions for them

23. add mocha: {
    timeout: 500000,
    }, in hardhat config to run tests on test network
