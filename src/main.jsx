import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import 'react-toastify/dist/ReactToastify.css';
import {  ToastContainer } from 'react-toastify';

import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { AppProvider } from "./contextApi/AppContext";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));

// Define the theme with the direction set to RTL
const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light", // or 'dark' depending on your preference
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

root.render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppProvider store={store}>
          <App />
          <ToastContainer rtl />

        </AppProvider>
      </Provider>
    </ThemeProvider>
  </CacheProvider>
);
