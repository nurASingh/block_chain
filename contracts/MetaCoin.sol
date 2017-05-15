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
		names[0x707e622b6a3acab24693251c78259a4275e29eb8] = "Arun";
		names[0xe5d354b7c91f4b901103458e1e6ecfee709e1dfd] = "Rahul";
		names[0x03c13b67c00085ea22b01b76dd7251de8d9232f9] = "Sanket";
		names[0xc520446a1a1d3b9fbeb1c83ef0c49a3460148d10] = "mahesh";
		names[0xcb5f4749befd462f3b4ac9acde573c994e539025] = "Aditya";
		names[0x1110e4c190e46cdca44a08527caa269e5711170a] = "UserX";
		names[0x629b95c3ac9a5d2493ddbb5ad2c5e82221dfaab6] = "UserX1";
		names[0x1a5f57a5d9b5b35f6f0bfe1bf176a159237930ee] = "UserX2";
		names[0xc73e48b2693acda2ab5e981c03f5ecba2bf0b22d] = "UserX3";
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
