import React from "react";
import { Link } from "react-router-dom";

const cardEqualHeight = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const cardFooter = {
  marginTop: "auto",
};

function Insurance() {

  return (
    <>
      <section className="hero is-dark mb-4">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">View all Insurances</h1>
          </div>
        </div>
      </section>
      
      <div className="container is-fluid">
        <div class="mt-6"></div>

        <div class="columns">
          <div class="ml-3">
            View:
          </div>
          <div class="ml-3">
            <label class="weather-insurance">
              <input type="checkbox" /> Weather Insurance 🌧️</label>
          </div>
          <div class="ml-3">
            <label class="hospital-insurance">
              <input type="checkbox" /> Hospital Insurance 🏥</label>
          </div>
          <div class="ml-5 mb-1">
            <button class="button is-small">Clear filter</button>
          </div>
          <div class="ml-5 mb-1">
            <button class="button is-small">Create new</button>
          </div>
        </div>


        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th><abbr title="Address">Block Address</abbr></th>
              <th><abbr title="Played">Type</abbr></th>
              <th><abbr title="Won">Start Date</abbr></th>
              <th><abbr title="Drawn">Expiry</abbr></th>
              <th><abbr title="Lost">Payment</abbr></th>
              <th><abbr title="Goals for">GF</abbr></th>
              <th><abbr title="Goals against">GA</abbr></th>
              <th><abbr title="Goal difference">GD</abbr></th>
              <th><abbr title="Points">Status</abbr></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>3</th>
              <td><a href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C." title="Tottenham Hotspur F.C.">Tottenham Hotspur</a></td>
              <td>19</td>
              <td>13</td>
              <td>6</td>
              <td>69</td>
              <td>35</td>
              <td>+34</td>
              <td>70</td>
            </tr>
            <tr>
              <th>3</th>
              <td><a href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C." title="Tottenham Hotspur F.C.">Tottenham Hotspur</a></td>
              <td>19</td>
              <td>13</td>
              <td>6</td>
              <td>69</td>
              <td>35</td>
              <td>+34</td>
              <td>70</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Insurance;
