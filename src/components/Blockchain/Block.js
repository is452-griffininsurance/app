import React, { useState, useEffect } from "react";
import Web3 from "web3";

function Block() {
  const [block, setBlock] = useState([]);
  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/962df9d540344f349b3ca4c976f68d0d"
      )
    );

    web3.eth.getBlock("latest").then(setBlock);
  }, []);
  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Blockchain</h1>
            <h2 className="subtitle">Current Block</h2>
          </div>
        </div>
      </section>
      <div className="container">
        {/* <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li class="is-active"><Link to="/" aria-current="page">Home</Link></li>
          </ul>
        </nav> */}
        Current Ethereum block is {block.number}.
      </div>
    </div>
  );
}

export default Block;
