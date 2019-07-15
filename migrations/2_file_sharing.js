/* eslint-disable no-undef */
const FileSharing = artifacts.require('./FileSharing.sol');

module.exports = (deployer) => {
  deployer.deploy(FileSharing);
};
