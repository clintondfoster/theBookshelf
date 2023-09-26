import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import App from "./App";
import "./index.css";
import NavBar from "./components/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> 
    <Provider store={store}> 
    <NavBar/> 
    <App/> 
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
