# Mass Gas Distribution

## Installation
1) Run ```git clone https://github.com/Dirt-Road-Development/mass-gas-distribution.git```
2) Run ```./setup.sh```

## How to use

In order to utilize this repository, you must:

1) Run `cp .env.example .env` and add a private key that has deployer role into the PRIVATE_KEY field in the .env file
2) Have sFUEL in the account you are deploying from

## Deployment
1) Run ```npx hardhat deploy --network <network_name>```

> This will deploy the MassGasDistribution contract with your deployer as the owner and caller

## Using the Contract

### Provide Addresses
Add addresses to the [./distribution_list.json](./distribution_list.json) file in the root of the directory.

> This should be value JSON

### Distribute Gas

```shell
    # Calypso Mainnet
    npx hardhat distribute --network <network-name>
```

> This will automatically split the addresses into batches of 7500 and make as many calls as needed to fill up each user.


## Utility Functions

### Generate Addresses

Looking to test on testnet? Run the following to generate addresses into the json file.

```shell
npx hardhat generate-addresses --amount <amount-goes-her>
```

## Toggles

The following are values that can be toggled in the deployment script [here](./deploy/deploy.ts).

- 0.00001 is the amount of sFUEL that is distributed by default
- 5 sFUEL is the default amount deposited into the contract.