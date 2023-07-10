'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv = __importStar(require('dotenv'));
const config_1 = require('hardhat/config');
require('@nomiclabs/hardhat-etherscan');
require('@typechain/hardhat');
require('hardhat-gas-reporter');
require('hardhat-contract-sizer');
require('solidity-coverage');
require('hardhat-docgen');
require('hardhat-tracer');
require('hardhat-spdx-license-identifier');
require('@tenderly/hardhat-tenderly');
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomiclabs/hardhat-ethers');
dotenv.config();
function getWallet() {
  return process.env.DEPLOYER_WALLET_PRIVATE_KEY !== undefined
    ? [process.env.DEPLOYER_WALLET_PRIVATE_KEY]
    : [];
}
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
config_1.task(
  'accounts',
  'Prints the list of accounts',
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  }
);
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config = {
  solidity: {
    version: process.env.SOLC_VERSION || '0.8.19',
    settings: {
      optimizer: {
        enabled:
          (process.env.SOLIDITY_OPTIMIZER &&
            'true' === process.env.SOLIDITY_OPTIMIZER.toLowerCase()) ||
          false,
        runs:
          (process.env.SOLIDITY_OPTIMIZER_RUNS &&
            parseInt(process.env.SOLIDITY_OPTIMIZER_RUNS)) ||
          200,
      },
    },
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: false,
  },
  contractSizer: {
    runOnCompile: false,
    strict: true,
  },
  spdxLicenseIdentifier: {
    runOnCompile: false,
  },
  gasReporter: {
    enabled:
      process.env.REPORT_GAS !== undefined
        ? process.env.REPORT_GAS.toLowerCase() === 'true'
        : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || '',
    gasPriceApi: process.env.GAS_PRICE_API || '',
    token: 'ETH',
    currency: 'USD',
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize:
        (process.env.ALLOW_UNLIMITED_CONTRACT_SIZE &&
          'true' === process.env.ALLOW_UNLIMITED_CONTRACT_SIZE.toLowerCase()) ||
        false,
    },
    custom: {
      url: process.env.CUSTOM_NETWORK_URL || '',
      accounts: {
        count:
          (process.env.CUSTOM_NETWORK_ACCOUNTS_COUNT &&
            parseInt(process.env.CUSTOM_NETWORK_ACCOUNTS_COUNT)) ||
          0,
        mnemonic: process.env.CUSTOM_NETWORK_ACCOUNTS_MNEMONIC || '',
        path: process.env.CUSTOM_NETWORK_ACCOUNTS_PATH || '',
      },
    },
    arbitrumTestnet: {
      url: process.env.ARBITRUM_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    auroraTestnet: {
      url: process.env.AURORA_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    avalancheFujiTestnet: {
      url: process.env.AVALANCHE_FUJI_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    ftmTestnet: {
      url: process.env.FTM_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL || '',
      accounts: getWallet(),
    },
    harmonyTest: {
      url: process.env.HARMONY_TEST_RPC_URL || '',
      accounts: getWallet(),
    },
    hecoTestnet: {
      url: process.env.HECO_TESTNET_RPC_URL || '',
      accounts: getWallet(),
    },
    kovan: {
      url: process.env.KOVAN_RPC_URL || '',
      accounts: getWallet(),
    },
    moonbaseAlpha: {
      url: process.env.MOONBASE_ALPHA_RPC_URL || '',
      accounts: getWallet(),
    },
    polygonMumbai: {
      url: process.env.POLYGON_MUMBAI_RPC_URL || '',
      accounts: getWallet(),
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || '',
      accounts: getWallet(),
    },
    ropsten: {
      url: process.env.ROPSTEN_RPC_URL || '',
      accounts: getWallet(),
    },
    sokol: {
      url: process.env.SOKOL_RPC_URL || '',
      accounts: getWallet(),
    },
  },
  etherscan: {
    apiKey: {
      arbitrumTestnet: process.env.ARBISCAN_API_KEY || '',
      auroraTestnet: process.env.AURORA_API_KEY || '',
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || '',
      bscTestnet: process.env.BSCSCAN_API_KEY || '',
      ftmTestnet: process.env.FTMSCAN_API_KEY || '',
      harmonyTest: process.env.HARMONY_POPS_API_KEY || '',
      hecoTestnet: process.env.HECOINFO_API_KEY || '',
      goerli: process.env.ETHERSCAN_API_KEY || '',
      kovan: process.env.ETHERSCAN_API_KEY || '',
      moonbaseAlpha: process.env.MOONSCAN_API_KEY || '',
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || '',
      rinkeby: process.env.ETHERSCAN_API_KEY || '',
      ropsten: process.env.ETHERSCAN_API_KEY || '',
      sokol: process.env.BLOCKSCOUT_API_KEY || '',
      custom: process.env.CUSTOM_EXPLORER_API_KEY || '',
    },
    customChains: [
      {
        network: 'custom',
        chainId:
          (process.env.CUSTOM_NETWORK_CHAIN_ID &&
            parseInt(process.env.CUSTOM_NETWORK_CHAIN_ID)) ||
          0,
        urls: {
          apiURL: process.env.CUSTOM_NETWORK_API_URL || '',
          browserURL: process.env.CUSTOM_NETWORK_BROWSER_URL || '',
        },
      },
    ],
  },
};
exports.default = config;
