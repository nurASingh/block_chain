// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
import hello_artifacts from '../../build/contracts/HelloWorld.json'
import sample_artifacts from '../../build/contracts/SimpleStorage.json' 
import CDS_artifacts from '../../build/contracts/CDS.json' 
// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
var HelloWorld = contract(hello_artifacts);
var Sample = contract(sample_artifacts);
var CDS = contract(CDS_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var account_2;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);
    HelloWorld.setProvider(web3.currentProvider);
    Sample.setProvider(web3.currentProvider);
    CDS.setProvider(web3.currentProvider);


CDS.deployed().then(function(myContractInstance){
var event = myContractInstance.Log([{valueA: 23}], function(error, result){
    if (!error)
      console.log(result);
  });
});

   

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      console.log(accs);
      account = accounts[0];
      console.log(accounts[0]);
      if(accounts[1]){
        account_2 = accounts[1];
      }

    // HelloWorld.deployed().then(function(instance){
    //     instance.Sent().watch(function(err,data)
    //     { 
    //       console.log(err + data)
    //     });
    // })

     // self.refreshBalance();


     //var self = this;
  // var meta;
  //   CDS.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.mint(1000, {from: account});
  //   }).then(function(val) {
  //     console.log('Promise' + val);
  //     self.getAllBalance(0);
  //   }).catch(function(e) {
  //     console.log(e);
  //   });

//this.getAllBalance(0);
    document.getElementById("log").innerHTML= "";
    self.getAllBalance(0);
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  getAllBalance : function(i){
     var self = this;

    var meta;
    
    
      CDS.deployed().then(function(instance) {
        meta = instance;
        return meta.getBalance.call(accounts[i], {from: account});
      }).then(function(value) {
        var balance_element = document.getElementById("log");
        balance_element.innerHTML += (accounts[i] + " = " +value.valueOf()  + "<br>");
        if(i < accounts.length-1){
            self.getAllBalance(i+1);
        }else{
          return;
        }
        
      }).catch(function(e) {
        console.log(e);
        //self.setStatus("Error getting balance; see log.");
      });
    
  },

  refreshBalance: function() {
    var self = this;

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      console.log("1 == " + account);
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
     // self.setStatus("Error getting balance; see log.");
    });

    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      console.log("2 == " + account_2);
      return meta.getBalance.call(account_2, {from: account_2});
    }).then(function(value) {
      var balance_element = document.getElementById("balance_2");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
     // self.setStatus("Error getting balance; see log.");
    });

    HelloWorld.deployed().then(function(instance){
      meta = instance;
      return meta.getBalance.call({from: account});
    }).then(function(value){
      var balance_element = document.getElementById("deposite");
      balance_element.innerHTML = value.valueOf();
    });


    Sample.deployed().then(function(instance){
      meta = instance;
      return meta.get.call({from: account});
    }).then(function(value){
      var balance_element = document.getElementById("sample");
      balance_element.innerHTML = value.valueOf();
    });
    document.getElementById("log").innerHTML= "";
    this.getAllBalance(0);
  },

  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: account});
    }).then(function() {
      //self.setStatus("Transaction complete!");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
     // self.setStatus("Error sending coin; see log.");
    });
  },


  testHelloWorld: function() {
    var self = this;
  var meta;
    HelloWorld.deployed().then(function(instance) {
      meta = instance;
      return meta.deposit(1000, {from: account});
    }).then(function(val) {
      console.log('Promise' + val);
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
    });
  },

  sample: function(){
    var self = this;
  var meta;
    Sample.deployed().then(function(instance) {
      meta = instance;
      return meta.set(5000, {from: account});
    }).then(function(val) {
      console.log('Promise' + val);
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
    });
  },


  pay: function(){
    var self = this;
    var meta ;
    CDS.deployed().then(function(instance){
      meta = instance;
      var amt = document.getElementById('amount').value;
      var rec = document.getElementById('receiver').value;

      if(amount < 0 || !rec){
        alert('please correct the value');
      }
      self.setStatus('Please wait.... In process');
      return meta.transfer(rec, parseInt(amt), {from : account});
    }).then(function(val){
      console.log(val);
       self.setStatus('Completed');
       document.getElementById("log").innerHTML= "";
       self.getAllBalance(0);
    }).catch(function(e){
      self.setStatus('Error : ' + e);
    });
  },



};



window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
