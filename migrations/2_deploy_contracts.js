var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var HelloWorld = artifacts.require("./HelloWorld.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var CDS = artifacts.require("./CDS.sol");
var TimeClock = artifacts.require("./TimeClock.sol");
module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(HelloWorld);
  deployer.deploy(SimpleStorage);
  deployer.deploy(CDS);
  deployer.deploy(TimeClock);
};
