pragma solidity >=0.4.21 <0.6.0;

import "./ERC20Token.sol";

contract ERC20TokenSale {
    address admin;
    ERC20Token public tokenContract;
    uint256 public tokenPrice;

    constructor(ERC20Token _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }    

}