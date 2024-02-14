import { writeFile } from "fs/promises";
import * as path from "path";
task("generate-addresses", "Generate Dummy Addresses for Testing")
	.addParam("amount", "Amount of Addresses")
	.setAction(async(taskArgs: any, hre) => {

		const { ethers } = hre;

		let addresses: string[] = [];
	    
	    for (let i = 0; i < Number(taskArgs.amount); i++) {
	        const wallet = ethers.Wallet.createRandom();
	        addresses.push(wallet.address);
	    }

	    await writeFile(path.resolve(__dirname, "../distribution_list.json"), JSON.stringify(addresses));
	})