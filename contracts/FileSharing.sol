pragma solidity ^0.5.0;

contract FileSharing {
	address public owner;
	uint public FarmCount;
	uint public BatchCount;

	struct Batch {
		uint FarmId;
		string MerkleRoot;
	}

	mapping (uint => address) public FarmOwners;
	mapping (string => mapping(address => string)) Keys;
	mapping (uint => Batch) public Batches;

	constructor() public {
		owner = msg.sender;
	}

	function createFarm() public returns (uint FarmId) {
		FarmCount++;
		FarmOwners[FarmCount] = msg.sender;
		return FarmCount;
	}

	function createBatch(uint FarmId, string memory MerkleRoot) public returns (uint BatchId) {
		require(FarmOwners[FarmId] == msg.sender, "Must be farm owner in order to create batch");

		BatchCount++;
		Batch memory b = Batch(FarmId, MerkleRoot);
		Batches[BatchCount] = b;
		return BatchCount;
	}

	function setPermission(
		address target,
		string memory IPFShash,
		uint FarmId,
		string memory key
	) public returns (bool success) {
		require(FarmOwners[FarmId] == msg.sender, "Must be farm owner in order to set permission");

		Keys[IPFShash][target] = key;
		return true;
	}

	function getPermission(
		string memory IPFShash
	) public view returns (string memory key) {
		return Keys[IPFShash][msg.sender];
	}

	function verifyHash(
		uint BatchId,
		string memory hashToBeVerified
	) public view returns (bool success) {
		return (keccak256(abi.encodePacked(hashToBeVerified)) == keccak256(abi.encodePacked(Batches[BatchId].MerkleRoot)));
	}
}
