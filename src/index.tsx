import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import { App } from "./App";
import  ReactDOM  from "react-dom";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";


ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

reportWebVitals();
