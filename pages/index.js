import React, { useState } from 'react';
import { ethers } from "ethers";

const Home = () => {
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  const [transfers, setTransfers] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const provider = new ethers.providers.InfuraProvider("mainnet", "b41746a63ed848c683d56bf98c5e5212");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const startBlockNumber = ethers.BigNumber.from(startBlock);
      const endBlockNumber = ethers.BigNumber.from(endBlock);

      const logs = await provider.getLogs({
        fromBlock: startBlockNumber,
        toBlock: endBlockNumber,
        topics: [],
      });

      console.log(logs);
      // Process the logs to get the transfer information

      setTransfers({ /* transfer information */ });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <div style={{ textAlign: 'center' }}>Pudgy Penguins Transfer Checker</div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input type="text" value={startBlock} onChange={e => setStartBlock(e.target.value)} />
          <input type="text" value={endBlock} onChange={e => setEndBlock(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        {error && <div>Error: {error.message}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          Object.keys(transfers).map(address => (
            <div key={address}>
              Address: {address}
              Number of Transfers: {transfers[address]}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
