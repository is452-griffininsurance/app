import "bulma/css/bulma.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="is452.us.auth0.com"
      clientId="zS3kwlOGPAq1lGo4g0MemUPMOW840taY"
      redirectUri={window.location.origin}
      audience="https://api.is452.cloud/"
      scope="read:profile write:profile read:bids create:bids"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
