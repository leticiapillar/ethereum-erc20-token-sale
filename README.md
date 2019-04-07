# ERC20Token

Project developed by course:
Code an ERC-20 Token on the Ethereum blockchain sell it with a crowd sale (ICO) website.


## DApp
  - Is published at https://leticiapillar.github.io/ethereum-erc20-token-sale/


## Stack
  - Truffle v5.0.10 (https://truffleframework.com/)
  - web3.js - Ethereum JavaScript API - v1.0.0-beta.51 (https://web3js.readthedocs.io/en/1.0/) (https://github.com/ethereum/web3.js/)
  - lite-server v2.4.0 (https://github.com/johnpapa/lite-server)
  - Bootstrap v4.3.1 (https://getbootstrap.com/)

if return null where using MetaMask plugin, observe the *Setting > Security > Privacy mode must off*
- console error:
    - get coinbase account:  null
    - https://github.com/MetaMask/metamask-extension/issues/5716


## Run app:
- npm run dev
- http://localhost:3000/


## Links:
  - Course:
    https://www.udemy.com/code-your-own-cryptocurrency/

  - Specification:
    https://eips.ethereum.org/EIPS/eip-20
    https://en.wikipedia.org/wiki/ERC-20
    https://theethereum.wiki/w/index.php/ERC20_Token_Standard


## Infura:
  - https://infura.io
  - https://truffleframework.com/docs/truffle/reference/configuration  
  - https://truffleframework.com/tutorials/using-infura-custom-provider  


## Mnemonic Code Converter:
  - Generate mnemonic code to connect MetaMask
    https://iancoleman.io/bip39/
  
  - Use an ether faucet
    https://faucet.metamask.io/


## Provision tokens:
  - Development environment
    ```javascript
    truffle console 
    ```

  - Ropsten environment
    ```javascript
    truffle console --network ropsten
    ```

  - Provision 75% of all tokens to the token sale
    ```javascript
    web3.eth.getAccounts().then(function (acc) { admin = acc[0]; })
    admin
    var tokensAvailable = 750000
    tokensAvailable
    ERC20TokenSale.deployed().then(function (i) { tokenSale = i; })
    tokenSale
    ERC20Token.deployed().then(function (i) { token = i; })
    token
    token.transfer(tokenSale.address, tokensAvailable, { from: admin })
    token.balanceOf(tokenSale.address).then(function (b) { balance = b; })
    balance.toNumber()
    ```
