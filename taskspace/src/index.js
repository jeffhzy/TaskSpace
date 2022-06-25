import ReactDOM from "react-dom";
import { ProvideAuth } from "./Hooks/useAuth";
import "./index.css";
import App from "./App";
import { StrictMode } from "react";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </StrictMode>,
  rootElement
);
