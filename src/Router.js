import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import TopNavbar from "./components/UI/TopNavbar";
import Stocks from "./components/Pages/Stocks";
import Insurance from "./components/Pages/Insurance";
import Flight from "./components/Pages/Flight";
import CreateFlight from "./components/Pages/CreateFlight";
import InvestFlight from "./components/Pages/InvestFlight";


export default function Router() {
  return (
    <BrowserRouter>
      <TopNavbar />
      <div>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/stocks" component={Stocks} />
          <Route path="/insurance" component={Insurance} />
          <Route path="/flight" component={Flight} />
          <Route path="/createflight" component={CreateFlight} />
          <Route path="/investflight" component={InvestFlight} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
