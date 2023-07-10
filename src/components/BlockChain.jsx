import React, { useEffect, useState } from "react";
import "./BlockChain.css";
import axios from "axios";

export default function BlockChain() {
  const [more, setMore] = useState(20);
  const [coin, setCoin] = useState([]);
  useEffect(() => {
    coindata();
    const interval = setInterval(coindata, 10000);
    return () => clearInterval(interval);
  }, [more]);
  console.log(coin);

  const coindata = async () => {
    const response = await axios.get(
      `https://api.coincap.io/v2/assets?limit=${more}`
    );
    setCoin(response.data.data);
  };
  const handleClick = () => {
    setMore(20);
    window.scrollTo(0, 0);
  };
  const handleShorter = () => {
    const sortedCoins = [...coin].sort(
      (a, b) =>
        parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr)
    );
    setCoin(sortedCoins);
  };

  return (
    <div className="coin">
      <h1> Live crypto prices</h1>
      <article>Showing {more} coins</article>
      <div className="buttons" style={{ marginBottom: ".5rem" }}>
        <button
          onClick={() => {
            more < 100 ? setMore(more + 20) : setMore(20);
          }}
        >
          Next
        </button>
        <button onClick={handleShorter}>Short changePercent24Hr</button>
        <button onClick={handleClick}>Refress</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Prices(USD)</th>
            <th>MarketCap(Usd)</th>
          </tr>
        </thead>
        <tbody>
          {coin.map((item, id) => (
            <tr key={id}>
              <td>{item.rank}</td>
              <td style={{fontSize:'1rem',color:'#4CAF50'}}>{item.name}</td>
              <td style={{ color: "#35ea" }}>
                $ {parseFloat(item.priceUsd).toFixed(4)}
              </td>
              <td style={{color:'#849aad'}}>$ {parseFloat(item.marketCapUsd).toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button
          onClick={() => {
            more < 100 ? setMore(more + 20) : setMore(20);
          }}
        >
          Next
        </button>
        <button onClick={handleShorter}>Short changePercent24Hr</button>
        <button onClick={handleClick}>Refress</button>
      </div>
    </div>
  );
}
