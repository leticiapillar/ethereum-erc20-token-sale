pragma solidity >=0.4.21 <0.6.0;

contract ERC20Token {
    string public name      = 'Leticia\'s Token';
    string public symbol    = 'LPL';
    string public standard  = 'Leticia\'s Token version 1.0';
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor (uint256 _initialSupply) public {
        balanceOf[msg.sender]   = _initialSupply;
        totalSupply             = _initialSupply;
    }

}
