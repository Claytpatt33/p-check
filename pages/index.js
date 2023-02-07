import React, { useState } from 'react';
import Web3 from 'web3';

const Home = () => {
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  const [transfers, setTransfers] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const headers = {
    'Content-Type': 'application/json',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=tokentx&address=0x123456&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=YourApiKey`,
        {
          headers: headers
        }
      );
      
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      
      const data = await response.json();
      setTransfers(data.result);
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
          <input type="text" value={startBlock} onChange={e => setStartBlock(e.target.value)} placeholder="Start Block" />
          <input type="text" value={endBlock} onChange={e => setEndBlock(e.target.value)} placeholder="End Block" />
          <button type="submit">Submit</button>
        </form>
        {error && <div>Error: {error.message}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {transfers.map(transfer => (
              <li key={transfer.hash}>
                Block: {transfer.blockNumber}
                Hash: {transfer.hash}
                From: {transfer.from}
                To: {transfer.to}
                Token Name: {transfer.tokenName}
                Value: {transfer.value}
                Timestamp: {transfer.timeStamp}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
