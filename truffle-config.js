// module.exports = {
//   // See <http://truffleframework.com/docs/advanced/configuration>
//   // for more about customizing your Truffle configuration!
//   networks: {
//     development: {
//       host: "127.0.0.1",
//       port: 7545,
//       network_id: "5777" // Match any network id
//     },
//     develop: {
//       port: 8545
//     }
//   }
// };
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
        ),
      network_id: 11155111, // Sepolia's network id
      gas: 5500000,         // Adjust as needed
      confirmations: 2,     // Number of blocks to wait between deployments
      timeoutBlocks: 200,   // Number of blocks before a deployment times out
      skipDryRun: true      // Skip dry run before migrations
    },
  },
  compilers: {
    solc: {
      version: "0.5.17"  
    }
  }
};

