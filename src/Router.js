import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PortfolioRecords from "./components/Pages/PortfolioRecords";
import TopNavbar from "./components/UI/TopNavbar";
import Stocks from "./components/Pages/Stocks";
import Block from "./components/Pages/Block";
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
          <Route path="/stocks" component={Stocks} />
          <ProtectedRoute
            path="/portfolio/records"
            component={PortfolioRecords}
          />
          <ProtectedRoute path="/block" component={Block} />
          <ProtectedRoute path="/profile" component={Block} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
