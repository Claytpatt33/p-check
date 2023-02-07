<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/ethers@5.0.3/dist/ethers.min.js"></script>
  </head>
  <body>
    <form>
      <div>
        <label>Start Block Number:</label>
        <input type="text" id="startBlock" required />
      </div>
      <div>
        <label>End Block Number:</label>
        <input type="text" id="endBlock" required />
      </div>
      <button type="submit">Submit</button>
    </form>
    <p id="output"></p>

    <script>
      const { ethers } = require("ethers");
      const provider = new ethers.providers.InfuraProvider(
        "mainnet",
        "b41746a63ed848c683d56bf98c5e5212"
      );

      async function getTransactionCountInBlockRange(startBlock, endBlock) {
        let transactionCount = 0;
        for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
          const block = await provider.getBlock(blockNumber);
          transactionCount += block.transactions.length;
        }
        return transactionCount;
      }

      const form = document.querySelector("form");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const startBlock = parseInt(document.querySelector("#startBlock").value);
        const endBlock = parseInt(document.querySelector("#endBlock").value);

        const transactionCount = await getTransactionCountInBlockRange(startBlock, endBlock);

        document.querySelector("#output").innerText = `Number of transactions in block range [${startBlock}, ${endBlock}]: ${transactionCount}`;
      });
    </script>
  </body>
</html>
