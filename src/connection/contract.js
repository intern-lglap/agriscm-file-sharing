/* eslint-disable no-console */
/* eslint-disable no-alert */
const TruffleContract = require('truffle-contract');
const Web3 = require('web3');

const artifact = require('../../build/contracts/FileSharing.json');

const FileSharing = TruffleContract(artifact);

module.exports = {
  async init() {
    await this.initWeb3();
  },

  async initWeb3() {
    const App = this;

    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      // eslint-disable-next-line no-undef
      App.web3Provider = web3.currentProvider;
      // eslint-disable-next-line no-undef
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      // eslint-disable-next-line no-undef
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      // eslint-disable-next-line no-undef
      web3 = new Web3(App.web3Provider);
    }

    // Load account data
    // TODO: Test if loading account data here works
    // eslint-disable-next-line no-undef
    web3.eth.getCoinbase((err, acc) => {
      if (err === null) {
        App.account = acc;
      }
    });

    await App.initContract();
  },

  initContract() {
    const App = this;
    FileSharing.setProvider(App.web3Provider);
  },

  createFarm(callback) {
    const App = this;

    let fsInstance;
    FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.createFarm({ from: App.account });
    }).then((createdFarmId) => {
      callback(createdFarmId);
    }).catch((err) => {
      console.warn(err);
    });
  },

  createBatch(farmId, merkleRoot, callback) {
    const App = this;

    let fsInstance;
    FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.createBatch(farmId, merkleRoot, { from: App.account });
    }).then((createdBatchId) => {
      callback(createdBatchId);
    }).catch((err) => {
      console.warn(err);
    });
  },

  setPermission(targetAddr, ipfsHash, farmId, key, callback) {
    const App = this;

    let fsInstance;
    FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.setPermission(targetAddr, ipfsHash, farmId, key, { from: App.account });
    }).then((success) => {
      callback(success);
    }).catch((err) => {
      console.warn(err);
    });
  },

  getPermission(ipfsHash, callback) {
    const App = this;

    let fsInstance;
    FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.getPermission.call(ipfsHash, { from: App.account });
    }).then((key) => {
      callback(key);
    }).catch((err) => {
      console.warn(err);
    });
  },

  verifyHash(batchId, hashToBeVerified, callback) {
    const App = this;

    let fsInstance;
    FileSharing.deployed().then((instance) => {
      fsInstance = instance;
      return fsInstance.verifyHash.call(batchId, hashToBeVerified, { from: App.account });
    }).then((success) => {
      callback(success);
    }).catch((err) => {
      console.warn(err);
    });
  },
};
