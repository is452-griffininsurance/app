import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import PortfolioRecords from "./components/Portfolio/PortfolioRecords";
import TopNavbar from "./components/UI/TopNavbar";
import Stocks from "./components/Stocks";

export default function Router() {
  return (
    <BrowserRouter>
      <TopNavbar></TopNavbar>
      <div>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/portfolio/records">
            <PortfolioRecords />
          </Route>
          <Route path="/stocks">
            <Stocks />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}