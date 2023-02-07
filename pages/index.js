const { ethers } = require("ethers");
const provider = new ethers.providers.InfuraProvider.getWebSocketProvider(
  "mainnet",
  "b41746a63ed848c683d56bf98c5e5212"
);

async function getTransactionCountInBlockRange(startBlock, endBlock) {
  let transactionCount = 0;
  for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
    const block = await provider.getBlock(blockNumber);
    transactionCount += block.transactions.length;
  }
  console.log(`Number of transactions in block range [${startBlock}, ${endBlock}]: ${transactionCount}`);
}

const startBlock = parseInt(prompt("Enter thestart block number: "));
const endBlock = parseInt(prompt("Enter the end block number: "));
getTransactionCountInBlockRange(startBlock, endBlock);

