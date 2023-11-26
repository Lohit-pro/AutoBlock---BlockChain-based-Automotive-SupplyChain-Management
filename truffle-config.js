const path = require("path");

module.exports = {
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true,
          runs: 200  
        }
      }
    }
  },
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    // develop: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: "*", // match any network
    //   websockets: true
    // }
    development: {
      host: "127.0.0.1",
      port: 7545, // Make sure this matches Ganache GUI's port
      network_id: "*", // match any network
      gas: 6721975, // Set the gas limit to a value that fits within Ganache's block gas limit
    },
  }
  
};