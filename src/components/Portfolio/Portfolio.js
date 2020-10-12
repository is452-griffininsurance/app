import React from "react";

function Portfolio() {
  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Portfolio</h1>
            <h2 className="subtitle">Overview</h2>
          </div>
        </div>
      </section>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th />
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
              <th />
              <th>Stock Code</th>
              <th>Side</th>
              <th>Date</th>
              <th>Cur</th>
              <th>Price</th>
              <th>Shares</th>
            </tr>
          </tfoot>
          <tbody />
        </table>
      </div>
    </div>
  );
}

export default Portfolio;
