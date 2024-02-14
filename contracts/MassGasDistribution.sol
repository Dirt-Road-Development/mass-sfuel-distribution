// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

error TooManyReceivers();

contract MassGasDistribution is AccessControl {

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    uint256 public distributionAmount;

    event SetDistributionAmount(uint256 indexed distributionAmount);
    event DistributeGas();

    constructor(
        uint256 _distributionAmount,
        address[] memory _managers
    ) payable {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);

        for (uint256 i = 0; i < _managers.length; i++) {
            _grantRole(MANAGER_ROLE, _managers[i]);
        }

        distributionAmount = _distributionAmount;
    }

    function distributeGas(address[] memory receivers) external onlyRole(MANAGER_ROLE) {
        if (receivers.length > 7500) revert TooManyReceivers();

        // for (uint16 i = 0; i < uint16(receivers.length); i++) {
        for (uint16 i = 0; i < receivers.length;) {
            payable(receivers[i]).transfer(distributionAmount);
            unchecked {
                i++;
            }
        }

        emit DistributeGas(); // uint16(receivers.length) * distributionAmount
    }

    function setDistributionAmount(uint256 newAmount) external onlyRole(MANAGER_ROLE) {
        distributionAmount = newAmount;
        emit SetDistributionAmount(newAmount);
    }

    function balanceOf() external view returns (uint256) {
        return address(this).balance;
    }

    function balanceOfUser(address user) external view returns (uint256) {
        return user.balance;
    }

    function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    } 

}
