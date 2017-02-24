pragma solidity ^0.4.4;

contract HelloWorld {
  uint public balance;
  uint public testvar;
  
  event Sent(uint amt);


  function HelloWorld(){
    balance = 100;
  }
  function deposit(uint amt) {
    testvar += amt;
    Sent(amt);
  }

  function getBalance() returns (uint){
    Sent(2000);
    return testvar;
  }

  function transfer(){
    
  }
}
