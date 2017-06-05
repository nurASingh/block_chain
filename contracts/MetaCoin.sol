pragma solidity ^0.4.2;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
	mapping (address => uint) balances;
	mapping (address => string) names;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Log(string text);

	function MetaCoin() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount){
			Log("Balance insufficient OR invalid receiver");
			return false;
		} 
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}

	function sentBWAccount(address receiver,address sender, uint amount) returns(bool sufficient) {
		if (balances[sender] < amount){
			Log("Balance insufficient OR invalid receiver");
			return false;
		} 
		balances[sender] -= amount;
		balances[receiver] += amount;
		Transfer(sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) returns(uint) {
		return balances[addr];
	}

	function getName(address addr) returns(string) {
		return names[addr];
	}
}
