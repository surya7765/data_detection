require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

// const PRIVATE_KEY =
//   "fe31028e3422258bdd4ac78c0573257b4883033e694326dca0e02b412f5b38af";

module.exports = {
  solidity: "0.8.1",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/g_e8S9R1jcKhk-DWwCqs0Qf3VresDav8",
      accounts: [
        "fe31028e3422258bdd4ac78c0573257b4883033e694326dca0e02b412f5b38af",
      ],
    },
  },
};
