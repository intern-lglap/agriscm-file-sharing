/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-alert */
// const TruffleContract = require('truffle-contract');
// const Web3 = require('web3');

// const artifact = require('../../../build/contracts/FileSharing.json');

// const FileSharing = TruffleContract(artifact);

const Connection = {
  contracts: { },

  async init() {
    await this.initWeb3();
  },

  async initWeb3() {
    const App = this;

    if (typeof web3 !== 'undefined') {
      console.log('Using Metamask');
      // If a web3 instance is already provided by Meta Mask.
      // eslint-disable-next-line no-undef
      App.web3Provider = web3.currentProvider;
      // eslint-disable-next-line no-undef
      web3 = new Web3(web3.currentProvider);
    } else {
      console.log('Using default web3 provider');
      // Specify default instance if no web3 instance provided
      // eslint-disable-next-line no-undef
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      // eslint-disable-next-line no-undef
      web3 = new Web3(App.web3Provider);
    }

    // Load account data
    // eslint-disable-next-line no-undef
    web3.eth.getCoinbase((err, acc) => {
      if (err === null) {
        App.account = acc;
      }
    });

    await App.initContract();
  },

  async initContract() {
    const App = this;

    $.getJSON('FileSharing.json', (FileSharing) => {
      // Instantiate a new truffle contract from the artifact
      App.contracts.FileSharing = TruffleContract(FileSharing);
      // Connect provider to interact with contract
      App.contracts.FileSharing.setProvider(App.web3Provider);
    });
  },

  createFarm() {
    const App = this;

    let fsInstance;
    console.log(App);
    App.contracts.FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.createFarm.call({ from: App.account });
    })
      .then((createdFarmId) => {
        fsInstance.createFarm({ from: App.account });
        return createdFarmId;
      })
      .then(createdFarmId => console.log('Farm ID:', createdFarmId.toString(10)))
      .catch((err) => {
        console.warn(err);
      });
  },

  createBatch(farmId, merkleRoot) {
    const App = this;

    let fsInstance;
    App.contracts.FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.createBatch.call(farmId, merkleRoot, { from: App.account });
    }).then((createdBatchId) => {
      fsInstance.createBatch(farmId, merkleRoot, { from: App.account });
      return createdBatchId;
    }).then(createdBatchId => console.log('Batch ID:', createdBatchId))
      .catch((err) => {
        console.warn(err);
      });
  },

  setPermission(targetAddr, ipfsHash, farmId, key) {
    const App = this;

    let fsInstance;
    App.contracts.FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.setPermission.call(targetAddr, ipfsHash, farmId, key, { from: App.account });
    }).then((success) => {
      fsInstance.setPermission(targetAddr, ipfsHash, farmId, key, { from: App.account });
      return success;
    }).then(success => console.log('Status: ', success ? 'success' : 'failed'))
      .catch((err) => {
        console.warn(err);
      });
  },

  getPermission(ipfsHash) {
    const App = this;

    let fsInstance;
    App.contracts.FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.getPermission.call(ipfsHash, { from: App.account });
    }).then(key => console.log('Key: ', key))
      .catch((err) => {
        console.warn(err);
      });
  },

  verifyHash(batchId, hashToBeVerified) {
    const App = this;

    let fsInstance;
    App.contracts.FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.verifyHash.call(batchId, hashToBeVerified, { from: App.account });
    }).then((success) => {
      console.log('Verification ', success ? 'successful' : 'failed');
    }).catch((err) => {
      console.warn(err);
    });
  },
};

$(() => {
  $(window).load(() => {
    Connection.init();
  });
});
