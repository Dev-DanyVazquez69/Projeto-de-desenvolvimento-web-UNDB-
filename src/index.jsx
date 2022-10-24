import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './App.css'
import metrica from "/metrica.png"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <header id="header">
        <div id="logo">
        <img id="img" src={metrica}/>
        </div>
        <div id="email">xxx.xxxxxx@metrica.com</div>
      </header>
      <div id="titulo">
        <h1>REGISTRO DE PRODUTOS</h1>
      </div>
      <App />
      <footer id="footer">
        <h1>UNDB2022</h1>
      </footer>
    </ChakraProvider>
  </React.StrictMode>
);
