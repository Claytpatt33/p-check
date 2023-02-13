const { ethers, AlchemyProvider } = require("ethers");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const provider = new AlchemyProvider("homestead", "iiDYJ0CAxQyqnDZqbtu7SvaX_hNzz6V5");

const contractAddress = "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8";
const ABI = ABI;

const contract = new ethers.Contract(contractAddress, ABI, provider);

async function getTransfers(startBlock, endBlock) {
  const transferEvent = contract.filters.Transfer(contractAddress);
  transferEvent.fromBlock = startBlock;
  transferEvent.toBlock = endBlock;

  const logs = await provider.getLogs(transferEvent);

  const transfers = {};
  logs.forEach(log => {
    if (log.topics[0] === "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") {
      const from = "0x" + log.topics[1].substr(26);
      const to = "0x" + log.topics[2].substr(26);

      transfers[from] = transfers[from] ? transfers[from] + 1 : 1;
      transfers[to] = transfers[to] ? transfers[to] + 1 : 1;
    }
  });

  return { transfers, startBlock, endBlock, success: true };
}

app.get("/transfers/:startBlock/:endBlock", async (req, res) => {
  const { startBlock, endBlock } = req.params;

  try {
    const result = await getTransfers(parseInt(startBlock), parseInt(endBlock));
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
