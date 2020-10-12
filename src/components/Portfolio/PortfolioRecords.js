import React, { useState, useEffect } from 'react';

function Buy() {
  return (
    <div className="has-text-success">
      SELL
    </div>
  )
}

function Sell() {
  return (
    <div className="has-text-danger">
      SELL
    </div>
  )
}

function PortfolioRecords() {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    fetch("https://jy58vi7wl7.execute-api.us-east-1.amazonaws.com/prod/portfolio?email=") // TODO: dynamic
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setRecords(result);
        },
        (error) => {
          console.log("Fetch portfolio records error", error);
        }
      )
  }, []);
  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Portfolio
          </h1>
            <h2 className="subtitle">
              Transactions List
          </h2>
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
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Stock Code</th>
              <th>Side</th>
              <th>Date</th>
              <th>Cur</th>
              <th>Price</th>
              <th>Shares</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th></th>
              <th>Stock Code</th>
              <th>Side</th>
              <th>Date</th>
              <th>Cur</th>
              <th>Price</th>
              <th>Shares</th>
            </tr>
          </tfoot>
          <tbody>
            {records.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value?.stockExchange}</td>
                  <td>{value?.stockCode}</td>
                  <td>
                    {value?.orderSide.toLowerCase() === "sell" ? <Sell /> : <Buy />}
                  </td>
                  <td>{value?.date}</td>
                  <td>{value?.currency}</td>
                  <td>{value?.price}</td>
                  <td>{value?.quantity}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PortfolioRecords;
