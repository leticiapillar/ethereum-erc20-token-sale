var ERC20Token = artifacts.require("./ERC20Token.sol");

contract('ERC20Token', function(accounts) {
  var tokenInstance,
      adminAccount = accounts[0],
      toAccount    = accounts[1];
  

  it('initializes the contract attributes', function() {
    return ERC20Token.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, 'Leticia\'s Token', 'has the correct name');
      return tokenInstance.symbol();
    }).then(function(symbol) {
      assert.equal(symbol, 'LPL', 'has the correct symbol');
      return tokenInstance.standard();
    }).then(function(standard) {
      assert.equal(standard, 'Leticia\'s Token version 1.0', 'has the correct standard');
    });
  });

  it('allocates the initial supply upon deployment', function() {
    return ERC20Token.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
      return tokenInstance.balanceOf(adminAccount);
    }).then(function(adminBalance) {
      assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin balance');
    });
  });

  it('transfers token ownership', function() {
    return ERC20Token.deployed().then(function(instance) {
      tokenInstance = instance;
      // Test 'require' statement first by transferring something larger the sender's balance
      return tokenInstance.transfer.call(toAccount, 9000000);
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.transfer.call(toAccount, 250000, { from: adminAccount});
    }).then(function(success) {
      assert.equal(success, true, 'it returns true success');
      return tokenInstance.transfer(toAccount, 250000, { from: adminAccount});
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args._from, adminAccount, 'logs the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args._to, toAccount, 'logs the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
      return tokenInstance.balanceOf(toAccount);
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving account');
      return tokenInstance.balanceOf(adminAccount);
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
    });
  });
  
});
