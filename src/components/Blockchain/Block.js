import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CreditLetter from "../../blockchain/abis/CreditLetter.json";
import OnboardingButton from "./OnboardingButton";

function Block() {
  const [block, setBlock] = useState([]);
  const [averageGasPrice, setAverageGasPrice] = useState(0);
  const [currentAddress, setCurrentAddress] = useState(0x00);
  const [currentLetterOfCredit, setCurrentLetterOfCredit] = useState([]);

  // Web3 client-side provider
  const web3 = new Web3(Web3.givenProvider);
  // Web3 server-side provider
  // const web3 = new Web3(
  //   new Web3.providers.HttpProvider(
  //     "http://127.0.0.1:7545" // "https://mainnet.infura.io/v3/962df9d540344f349b3ca4c976f68d0d"
  //   )
  // );
  useEffect(() => {
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
      setCurrentAddress(defaultAccount);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function DeployContractButton() {
    const deployLC = () => {
      // Deploying contract should be done through our backend service
      const creditLetter = new web3.eth.Contract(CreditLetter.abi);
      creditLetter
        .deploy({
          data: `${CreditLetter.bytecode}`,
          arguments: [
            currentAddress,
            currentAddress,
            currentAddress,
            web3.utils.toHex(1), // need to toHex
            web3.utils.toHex(2),
            web3.utils.toHex(1800),
          ],
        })
        .send({
          from: currentAddress,
          gasPrice: averageGasPrice,
          gas: 2310334,
        });
    };
    return (
      <input
        className="button"
        type="submit"
        value="Deploy Letter of Credit"
        onClick={deployLC}
      />
    );
  }

  function ContractInteractionButton() {
    const interactWithLC = () => {
      const creditLetter = new web3.eth.Contract(
        CreditLetter.abi,
        "0x177F046beb15F1a263638b8211ff6B0EaBD2b455"
      );

      creditLetter.methods
        .getInfo()
        .call({ from: currentAddress })
        .then((response) => {
          console.info(response);
          setCurrentLetterOfCredit(response);
        });
    };

    return (
      <input
        className="button"
        type="submit"
        value="Read-only Interaction"
        onClick={interactWithLC}
      />
    );
  }

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
                <div className="content">
                  <OnboardingButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            <div>
              Current Ethereum block is {block.number}. Current average gas
              price is {averageGasPrice}.{web3.eth.defaultAccount}
              <DeployContractButton /> <ContractInteractionButton />
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            <div>Letter of Credit details.</div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <abbr>Key</abbr>
                    </th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(currentLetterOfCredit).map((key) => {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{currentLetterOfCredit[key]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Block;
