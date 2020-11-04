import React from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import Home from "./components/Pages/Homepage-User/Home";
import TopNavbar from "./components/UI/TopNavbar";
import Insurance from "./components/Pages/Insurance";
import Flight from "./components/Pages/Flight";
import CreateFlight from "./components/Pages/CreateFlight";
import InvestFlight from "./components/Pages/InvestFlight";
import Regulators from "./components/Pages//Homepage-Regulator/HomeRegulators";
import Login from "./components/Pages/Login";


export default function Router() {
  const LoginContainer = () => (
    <div className="container">
      <Route exact path="/" component={Login} />
    </div>
  )

  const DefaultContainer = () => (
    <div>
      <div className="container">
        <TopNavbar />
        <Route path="/home" component={Home} />
        <Route path="/insurance" component={Insurance} />
        <Route path="/flight" component={Flight} />
        <Route path="/createflight" component={CreateFlight} />
        <Route path="/investflight/:id" component={InvestFlight} />
        <Route path="/regulators" component={Regulators} />
      </div>
    </div>
  )

  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route component={DefaultContainer} />
          <Route path="/insurance" component={Insurance} />
          <Route path="/flight" component={Flight} />
          <Route path="/createflight" component={CreateFlight} />
          <Route exact path="/investflight/:id" component={InvestFlight} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
