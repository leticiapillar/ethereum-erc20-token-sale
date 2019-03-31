# ERC20Token

Project developed on course: 
Code an ERC-20 Token on the Ethereum blockchain sell it with a crowd sale (ICO) website

  - Truffle v5.0.10 (https://truffleframework.com/)
  - web3.js - Ethereum JavaScript API - v1.0.0-beta.51 (https://web3js.readthedocs.io/en/1.0/) (https://github.com/ethereum/web3.js/)
  - lite-server v2.4.0 (https://github.com/johnpapa/lite-server)
  - Bootstrap v4.3.1 (https://getbootstrap.com/)

### Run app:
  npm run dev
  http://localhost:3000/

### Links:

  - Course: 
    https://www.udemy.com/code-your-own-cryptocurrency/

  - Specification:
    https://eips.ethereum.org/EIPS/eip-20
    https://en.wikipedia.org/wiki/ERC-20
    https://theethereum.wiki/w/index.php/ERC20_Token_Standard



### Provision tokens:
  - Provision 75% of all tokens to the token sale
  > truffle console

  ERC20TokenSale.deployed().then(function (i) { tokenSale = i; })
  ERC20Token.deployed().then(function (i) { token = i; })
  tokensAvailable = 750000
  web3.eth.getAccounts().then(function (acc) { admin = acc[0]; })
  token.transfer(tokenSale.address, tokensAvailable, { from: admin })
  token.balanceOf(tokenSale.address).then(function (b) { balance = b; })