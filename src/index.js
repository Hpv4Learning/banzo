import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Archivio from "./Archivio";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Importiamo i Provider per la nostra App:
// - App Provider permette di far accedere a tutti i suoi figli i valori nel nostro context
import { AppProvider } from "./context";

//Provider per usare la libreria di design di chakra
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// 2. Usiamo il tema scuro
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const theme = extendTheme({ config });

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <Layout>
                  <App />
                </Layout>
              }
            />
            <Route
              path='/archivio'
              element={
                <Layout>
                  <Archivio />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
