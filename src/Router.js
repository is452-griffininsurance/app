import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Pages/Homepage-User/Home";
import TopNavbar from "./components/UI/TopNavbar";
import Insurance from "./components/Pages/Insurance";
import Flight from "./components/Pages/Flight";
import CreateFlight from "./components/Pages/CreateFlight";
import InvestFlight from "./components/Pages/InvestFlight";
import Regulators from "./components/Pages/HomeRegulators";


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
          <Route path="/insurance" component={Insurance} />
          <Route path="/flight" component={Flight} />
          <Route path="/createflight" component={CreateFlight} />
          <Route path="/investflight/:id" component={InvestFlight} />
          <Route path="/regulators" component={Regulators} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
