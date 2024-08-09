1. yarn hardhat compile
2. copy the abi section from /artifacts/contracts/FundMe.sol/fundme.json and replace it with the abi section of frontend/constants.js
3. yarn hardhat node from root folder, copy the deployed at contract address and swap it with the contract address of frontend/constants.js
4. add a new network in metamask with the config
   Network name
   HardHat-localhost
   New RPC URL
   http://127.0.0.1:8545/
   Chain ID
   31337
   Currency symbol
   Eth
   Block explorer URL
   NA
5. import one pf the private keys from the running node to your metamask
