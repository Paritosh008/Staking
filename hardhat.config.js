require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan");

module.exports = {

  solidity: "0.8.6",
  settings:{
    optimizer:{
      enabled:true,
      runs:200
    }
  },
  networks:{
    hardhat:{
      chainId:1337  //chainId 1337 is for localhost
    },
    goerli:{
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 5,
    },
    // etherscan: {
    //   apiKey: {
    //     goerli: process.env.ETHERSCAN_API_KEY,
    //   },
    // },
  },
  gasReporter:{
    enabled:true,
    currency:"INR",
    outputFile:"gasReports2.txt",
    noColors:true,
    coinmarketcap:"1a0e61d7-45ed-427e-96a7-ab5488edba52"
    
  }
  }
