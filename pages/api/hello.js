const { ethers, AlchemyProvider } = require("ethers");
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const d = new Date();
  const response = {
    date: d.toString()
  };
  res.end(JSON.stringify(response));
};

module.exports = allowCors(handler);

const provider = new AlchemyProvider("homestead", "iiDYJ0CAxQyqnDZqbtu7SvaX_hNzz6V5");

ABI = ABI;
const contract = new ethers.Contract(contractAddress, ABI, provider);

async function getTransfers(startBlock, endBlock) {
  const transferEvent = contract.filters.Transfer(contractAddress);
  transferEvent.fromBlock = startBlock;
  transferEvent.toBlock = endBlock;

  const logs = await provider.getLogs(transferEvent);

  const transfers = {};
  if (logs.length > 0){logs.forEach(log => {
    if (log.topics[0] === "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") {
      const from = "0x" + log.topics[1].substr(26);
      const to = "0x" + log.topics[2].substr(26);

      transfers[from] = transfers[from] ? transfers[from] + 1 : 1;
      transfers[to] = transfers[to] ? transfers[to] + 1 : 1;
    }
  });
}

  return { transfers, startBlock, endBlock, success: true };
}

app.get("/transfers/:startBlock/:endBlock", async (req, res) => {
  const { startBlock, endBlock } = req.params;

  try {
    const result = await getTransfers(parseInt(startBlock), parseInt(endBlock));
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(res.status(500).json({
  success: false,
  error: error.toString()
});