var ERC20Token = artifacts.require("./ERC20Token.sol");
var ERC20TokenSale = artifacts.require("./ERC20TokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC20Token, 1000000).then(function() {
    var tokenPrice = 1000000000000000; // Token price is 0.001 Ether
    return deployer.deploy(ERC20TokenSale, ERC20Token.address, tokenPrice);
  });
};
