import DistributionList from "../distribution_list.json";

const chunk = (arr: string[]) => {
	return Array.from({ length: Math.ceil(arr.length / 7500 )}, (v, i) => {
		return arr.slice(i * 7500, i * 7500 + 7500);
	});
}

task("distribute", "Distribute Tokens Script")
	.setAction(async(taskArgs: any, hre) => {
		
		const [ signer ] = await hre.ethers.getSigners();

	    const { ethers, deployments } = hre;

	    const { abi, address } = await deployments.get("MassGasDistribution");

	    const contract = new ethers.Contract(address, abi, signer);

	    let list = DistributionList.filter((addr: string) => ethers.utils.isAddress(addr));

	    console.log("Contract Balance Before: " + ethers.utils.formatUnits((await contract.balanceOf()).toString(), "ether") + " ETH");

	    const lists = chunk(list);

	    for (const recipientList of lists) {
	    	const tx = await contract.distributeGas(recipientList, {
	    		gasLimit: 260_000_000
	    	});
	    	await tx.wait(1);
	    	console.log("Round Completed");
	    }

	    console.log("Contract Balance After: " + ethers.utils.formatUnits((await contract.balanceOf()).toString(), "ether") + " ETH");

	    console.log("Distribution Successful to " + list.length + " addresses!");
    });