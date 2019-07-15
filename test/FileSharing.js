/* eslint-disable no-undef */
const FileSharing = artifacts.require('./FileSharing.sol');

contract('FileSharing', (accounts) => {
  let FileSharingInstance;

  it('initializes with zero farm and batch', () => FileSharing.deployed().then((instance) => {
    FileSharingInstance = instance;
    return instance.BatchCount();
  })
    .then((count) => {
      assert.equal(count, 0);
      return FileSharingInstance.FarmCount();
    })
    .then((count) => {
      assert.equal(count, 0);
    }));

  it('allows a user to create a farm', () => FileSharing.deployed().then((instance) => {
    FileSharingInstance = instance;
    return FileSharingInstance.createFarm({ from: accounts[0] });
  })
    .then(() => FileSharingInstance.FarmOwners(1))
    .then((ownerAddress) => {
      assert(ownerAddress, accounts[0]);
      return FileSharingInstance.FarmCount();
    })
    .then((count) => {
      assert.equal(count, 1, 'increments the farm count correctly');
    }));

  it('allows a farm owner to give a key to another address', () => FileSharing.deployed().then((instance) => {
    FileSharingInstance = instance;
    return FileSharingInstance.setPermission(accounts[1], 'testipfshash', 1, 'verysecretkey', { from: accounts[0] });
  })
    .then(() => FileSharingInstance.getPermission('testipfshash', { from: accounts[1] }))
    .then((key) => {
      assert.equal(key, 'verysecretkey');
    }));

  it('should not allow a non-farm owner to give a key to another address', () => FileSharing.deployed().then((instance) => {
    FileSharingInstasnce = instance;
    return FileSharingInstance.setPermission(accounts[1], 'testipfshash', 1, 'verysecretkey', { from: accounts[2] });
  })
    .then(assert.fail).catch((error) => {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
    }));

  it('allows a farm owner to create a batch with the correct merkle root', () => FileSharing.deployed().then((instance) => {
    FileSharingInstasnce = instance;
    return FileSharingInstance.createBatch(1, 'testmerkleroot', { from: accounts[0] });
  })
    .then(() => FileSharingInstance.Batches(1))
    .then((batch) => {
      assert.equal(batch[1], 'testmerkleroot');
      return FileSharingInstance.BatchCount();
    })
    .then((count) => {
      assert.equal(count, 1, 'increments the batch count correctly');
    }));

  it('should not allow a non-farm owner to create a batch', () => FileSharing.deployed().then((instance) => {
    FileSharingInstasnce = instance;
    return FileSharingInstance.createBatch(1, 'testmerkleroot', { from: accounts[2] });
  })
    .then(assert.fail).catch((error) => {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
    }));

  it('verifies correct hashes', () => FileSharing.deployed().then((instance) => {
    FileSharingInstance = instance;
    return FileSharingInstance.verifyHash(1, 'testmerkleroot');
  })
    .then((verificationResult) => {
      assert(verificationResult, 'should return true');
    }));

  it('does not verify incorrect hashes', () => FileSharing.deployed().then((instance) => {
    FileSharingInstance = instance;
    return FileSharingInstance.verifyHash(1, 'Testmerkleroot');
  })
    .then((verificationResult) => {
      assert(!verificationResult, 'should return false');
    }));

  it('should return blank string if no key has been set', () => FileSharing.deployed().then((instance) => {
    FileSharingInstance = instance;
    return FileSharingInstance.getPermission('testipfshash', { from: accounts[3] });
  })
    .then((key) => {
      assert.equal(key, '');
    }));
});
