const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const smartContractFactory = await hre.ethers.getContractFactory("AdapterjsTest");
  const smartContract = await smartContractFactory.attach("0xeffD4Ae3a76271BA1b0B758a214ED40EC1b4EC04");
  const result = await smartContract.int_result();
  console.log('js result on-chain: ', result);
}

main()
  .then(() => {
    return;
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });