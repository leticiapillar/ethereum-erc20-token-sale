var ERC20Token = artifacts.require("./ERC20Token.sol");

contract('ERC20Token', function(accounts) {
  var tokenInstance;

  it('allocates the initial supply upon deployment', function() {
    return ERC20Token.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
    });
  });
  
});
