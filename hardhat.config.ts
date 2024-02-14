/**
 *
 * @author Sawyer Cutler
 * @copyright 2024 Dirt Road Development
 * @license MIT
 *
**/

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

import "./tasks/distribute";
import "./tasks/generate_addresses";

dotenv.config();

const PRIVATE_KEY: string | undefined = (process.env.PRIVATE_KEY as string | undefined);
if (!PRIVATE_KEY) {
    throw new Error("Private Key Not Found");
}

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: (2 ^ 32) - 1,
          },
        },
    },
    /// Required to work with hardhat deploy and the auatomation
    namedAccounts: {
        deployer: 0 
    },
    networks: {
        "nebula": {
            accounts: [PRIVATE_KEY],
            url: "https://mainnet.skalenodes.com/v1/green-giddy-denebola"
        },
        "nebula-testnet": {
            accounts: [PRIVATE_KEY],
            url: "https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet"
        }
    }
};

export default config;
