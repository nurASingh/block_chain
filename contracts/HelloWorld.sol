pragma solidity ^0.4.4;

contract HelloWorld {
  uint public balance;
  uint public testvar;
  
  event sent(uint amt);


  function HelloWorld(){
    balance = 100;
  }
  function deposit(uint amt) returns (uint){
    testvar = amt;
    sent(amt);
    return testvar;
  }

  function getBalance() returns (uint){
    sent(2000);
    return testvar;
  }
}
