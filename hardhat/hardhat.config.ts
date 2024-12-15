import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      forking: {
        url: process.env.ARB_ALCHEMY_API_KEY!,
        blockNumber: 280779766,
      },
    },
    arbitrum: {
      url: process.env.ARB_ALCHEMY_API_KEY!,
      accounts: [process.env.ARB_PRIVATE_KEY!],
      chainId: 42161, // Arbitrum One chainId
    },
  },
  etherscan: {
    apiKey: process.env.ARBISCAN_API_KEY,
  },
};

export default config;
