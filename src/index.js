import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import CartState from "./context/cart/CartState";

ReactDOM.render(
  <React.StrictMode>
    <CartState>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartState>
  </React.StrictMode>,
  document.getElementById("root")
);
