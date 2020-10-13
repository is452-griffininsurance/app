import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CreditLetterFactory from "../../blockchain/abi";

function Block() {
  const [block, setBlock] = useState([]);
  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545" // "https://mainnet.infura.io/v3/962df9d540344f349b3ca4c976f68d0d"
      )
    );

    web3.eth.getBlock("latest").then(setBlock);
    const PAAddress = "0xf25186b5081ff5ce73482ad761db0eb0d25abfbf";
    const PA = web3.eth.Contract(new CreditLetterFactory()).at(PAAddress);
    console.log(PA);
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
