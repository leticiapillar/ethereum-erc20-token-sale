pragma solidity >=0.4.21 <0.6.0;

contract ERC20Token {
    uint256 public totalSupply;

    constructor() public {
        totalSupply = 1000000;
    }

}
