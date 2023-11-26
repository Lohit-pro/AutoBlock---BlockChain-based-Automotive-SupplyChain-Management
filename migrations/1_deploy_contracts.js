var SupplyChainContract = artifacts.require("./SupplyChain.sol");
// var RolesContract = artifacts.require("./rolesUtils/Roles.sol");
// var ManufacturerContract = artifacts.require("./rolesUtils/Manufacturer.sol");
// var ThirdpartyContract = artifacts.require("./rolesUtils/Thirdparty.sol");
// var CustomerContract = artifacts.require("./rolesUtils/Customer.sol");
// var DeliveryHubContract = artifacts.require("./rolesUtils/DeliveryHub.sol");

module.exports = function(deployer) {

  // deployer.deploy(ManufacturerContract);
  // deployer.deploy(RolesContract);
  deployer.deploy(SupplyChainContract, {gas: 15555555});
  // deployer.deploy(ThirdpartyContract);
  // deployer.deploy(CustomerContract);
  // deployer.deploy(DeliveryHubContract);
  // deployer.deploy(FetchContract, {gas: 15555555});
};