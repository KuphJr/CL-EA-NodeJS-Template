const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {

  // connect to a deployed instance of the smart contract
  const smartContractFactory = await hre.ethers.getContractFactory("AdapterjsTest");

  // Make sure it is funded with LINK  
  const smartContract = await smartContractFactory.attach("0x210E13E1A0456149D60F1539004fA9bD11C97Ae9");

  // set up a listener to print events emitted by the smart contract
  // let filter = { address: smartContract.address };
  // let provider = new ethers.providers.JsonRpcProvider("https://dry-young-sun.matic-testnet.quiknode.pro/f0d9ee2313cc5813ca36460677985e066497f634/");
  // // decrements how many events have been caught
  // let i = 2;
  // const listener = new Promise((resolve, reject) => provider.on(filter, async (event) => {
  //   if (event.topics.includes('0xb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af9')) {
  //     console.log("CHAINLINK REQUEST EVENT EMITTED");
  //     i--;
  //   }
  //   if (event.topics.includes('0x8c2992c05dc87c07311894d1f943111cba4f45bbe1fd66dce65cc5db2c834359')) {
  //     let int256_result = await smartContract.int_result();
  //     console.log("CHAINLINK ORACLE RETURNED INT256:", int256_result.toNumber());
  //     i--;
  //   }
  //   if (event.topics.includes('0x55cbd3f8c60adc9f7984732c240ea015acf17284b6d83d670ba4ee42b44783ee')) {
  //     let uint256_result = await smartContract.uint_result();
  //     console.log("CHAINLINK ORCALE RETURNED UINT256:", uint256_result.toNumber());
  //     i--;
  //   }
  //   if (event.topics.includes('0x622c782522db5098e0f79fccd5c2b5b18a9717cdb1eb12934e4b1beb3b255377')) {
  //     let bool_result = await smartContract.bool_result();
  //     console.log("CHAINLINK ORCALE RETURNED BOOL:", bool_result);
  //     i--;
  //   }
  //   if (event.topics.includes('0xdbb7bea395204da325e836f2375f392081152b224349387309f865df9c19ce2c')) {
  //     let bytes32_result = await smartContract.bytes32_result();
  //     console.log("CHAINLINK ORCALE RETURNED BYTES32:", ethers.utils.parseBytes32String(bytes32_result));
  //     i--;
  //   }
  //   if (i === 0) {
  //     process.exit(0);
  //   }
  // }));
  // listener;

  const tx = await smartContract.intAdapterCall(
    ethers.utils.getAddress("0xEe691ca9dEbBF16cddB731D78c63e57cb6E560F1"), "a91c6eaedc97426cb4f32bf30119784a", ethers.BigNumber.from("10").pow(18),
    'return -1 * myNum;', '{ "myNum": 8 }', '', '');
}

main()
  .then(() => {
    return;
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });