require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    alchemy_sepolia: {
      url: process.env.REACT_APP_ALCHEMY_SEPOLIA_URL,
      accounts: [`0x${process.env.REACT_APP_METAMASK_ACCOUNT_PRIVATE_KEY}`],
    },
  },
};
