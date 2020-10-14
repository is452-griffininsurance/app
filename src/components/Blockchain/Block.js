import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CreditLetterFactory from "../../blockchain/abis/CreditLetterFactory.json";

function Block() {
  const [block, setBlock] = useState([]);
  const [averageGasPrice, setAverageGasPrice] = useState(0);
  const web3 = new Web3(Web3.givenProvider);

  // const [contract, setContract] = useState();

  useEffect(() => {
    // Web3 server-side provider
    // const web3 = new Web3(
    //   new Web3.providers.HttpProvider(
    //     "http://127.0.0.1:7545" // "https://mainnet.infura.io/v3/962df9d540344f349b3ca4c976f68d0d"
    //   )
    // );

    // Get average gas price
    web3.eth
      .getGasPrice()
      .then((price) => {
        console.log(`Average gas price: ${price}`);
        setAverageGasPrice(price);
      })
      .catch(console.error);
    // Get latest block
    web3.eth.getBlock("latest").then(setBlock);
    window.ethereum.enable().then((account) => {
      const defaultAccount = account[0];
      web3.eth.defaultAccount = defaultAccount;
    });

    // Deploying L/C from the frontend (think for us, we do on backend instead)
    const creditLetter = new web3.eth.Contract(CreditLetterFactory.abi);
    creditLetter
      .deploy({
        data: `${CreditLetterFactory.bytecode}`,
        arguments: [
          web3.eth.defaultAccount,
          web3.utils.toHex(1000), // need to toHex
          web3.utils.toHex(1),
        ],
      })
      .send({
        from: "0x6D9007d50950F2a8ddd44795082AAA4fEBb5Cb73",
        gasPrice: "1000",
        gas: 2310334,
      });
  }, []);

  return (
    <div>
      <section className="hero is-dark mb-4">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Blockchain</h1>
            <h2 className="subtitle">Interact with wallet</h2>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="columns">
          <div className="column is-6">
            <div className="card">
              <div className="card-content has-text-centered">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">MetaMask</p>
                  </div>
                </div>

                <div className="content">
                  Connect to the MetaMask Chrome extension
                </div>
              </div>
            </div>
            Current Ethereum block is {block.number}. Current average gas price
            is {averageGasPrice}.{web3.eth.defaultAccount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Block;
