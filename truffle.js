// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '10.129.15.221',
      port: 8545,
      network_id: '*' // Match any network id
    },
    test : {
      host: '10.129.15.221',
      port: 8545,
      network_id: '1999' // Match any network id
    }
  }
}
