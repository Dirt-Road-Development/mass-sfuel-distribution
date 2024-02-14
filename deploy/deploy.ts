import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer} = await getNamedAccounts();
        
    await deploy(
        "MassGasDistribution",
        {
            from: deployer,
            log: true,
            args: [
                hre.ethers.utils.parseEther("0.00001"),
                []
            ],
            value: hre.ethers.utils.parseEther("5")
        }
    );
}

export default func;

func.tags = ["deploy"];
