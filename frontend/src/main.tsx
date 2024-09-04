import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";

import { MantineProvider, createTheme, rem } from "@mantine/core";

// NOTE: the website had this for default setup but not Vite setup so I included it here in case
const theme = createTheme({
  defaultRadius: 0,
  fontFamily: "Inter, sans-serif",
  headings: {
    fontWeight: "600",
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
