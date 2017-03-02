pragma solidity ^0.4.2;

contract CDS {

    mapping (address => uint) balances;
    event Log(string text);
     address minter ;

    function CDS(){
        minter = tx.origin;
        balances[tx.origin] = 0;
    }

    function mint(uint amount) returns (bool status){
        if(msg.sender == minter){
            balances[tx.origin] += amount;
            return true;
        }
        return false;
    }

    function transfer(address receiver , uint amount) returns (bool status){
        if (balances[msg.sender] < amount){
			Log("Balance insufficient OR invalid receiver");
            //trigger CDS
            triggerCDS(receiver,amount);
			return false;
		} 
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		
		return true;
    }

    function getBalance(address addr) returns(uint) {
		return balances[addr];
	}

    function triggerCDS(address receiver , uint amount){
        Log("Triggering CDS.. please wait...");
    }
}