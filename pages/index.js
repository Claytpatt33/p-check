const { ethers } = require("ethers");
const provider = ethers.getDefaultProvider("mainnet", "b41746a63ed848c683d56bf98c5e5212");

async function getTransactionCountInBlockRange(startBlock, endBlock) {
  let transactionCount = 0;
  for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
    const block = await provider.getBlock(blockNumber);
    transactionCount += block.transactions.length;
  }
  console.log(`Number of transactions in block range [${startBlock}, ${endBlock}]: ${transactionCount}`);
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("Enter the start block number: ", startBlock => {
  readline.question("Enter the end block number: ", endBlock => {
    getTransactionCountInBlockRange(parseInt(startBlock), parseInt(endBlock));
    readline.close();
  });
});
