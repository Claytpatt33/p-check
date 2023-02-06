import React, { useState } from 'react';

const Home = () => {
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  const [transfers, setTransfers] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://p-check.vercel.app/check?startBlock=${startBlock}&endBlock=${endBlock}`);
    const data = await response.json();

    setTransfers(data.transfers);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={startBlock}
          onChange={(e) => setStartBlock(e.target.value)}
          placeholder="Start block"
        />
        <input
          type="text"
          value={endBlock}
          onChange={(e) => setEndBlock(e.target.value)}
          placeholder="End block"
        />
        <button type="submit">Submit</button>
      </form>
      {transfers && Object.keys(transfers).length > 0 && (
        <ul>
          {Object.entries(transfers).map(([address, transferCount]) => (
            <li key={address}>
              {address}: {transferCount} transfers
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
