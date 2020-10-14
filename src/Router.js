import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PortfolioRecords from "./components/Portfolio/PortfolioRecords";
import TopNavbar from "./components/UI/TopNavbar";
import Stocks from "./components/Stocks";
import Block from "./components/Blockchain/Block";
import ProtectedRoute from "./auth/ProtectedRoute";

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
          <ProtectedRoute
            path="/portfolio/records"
            component={PortfolioRecords}
          />
          <Route path="/stocks" component={Stocks} />
          <ProtectedRoute path="/block" component={Block} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
