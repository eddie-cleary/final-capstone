import React from "react";
import "@fontsource/lobster/400.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

let mealPlannerTheme = createTheme({
  palette: {
    primary: {
      main: "#A3D572",
    },
    fadedText: {
      main: "rgba(92, 103, 85, 0.31)",
    },
    warning: {
      main: "#F6983C",
    },
    text: {
      main: "#5C6755",
    },
    white: {
      main: "#fff",
    },
  },
  typography: {
    allVariants: {
      color: "#5C6755",
    },
    fontSize: 18,
    fontFamily: ["Roboto", "sans-serif"].join(","),
    h1: {
      fontFamily: ["Lobster", "serif"].join(","),
    },
    h2: {
      fontFamily: ["Lobster", "serif"].join(","),
    },
    h3: {
      fontFamily: ["Lobster", "serif"].join(","),
    },
    h4: {
      fontFamily: ["Lobster", "serif"].join(","),
    },
    h5: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
    },
    h6: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontWeight: "bold",
    },
  },
});

mealPlannerTheme = createTheme(mealPlannerTheme, {
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "btn" },
          style: {
            color: "#5C6755",
            fontWeight: "600",
            backgroundColor: "#E8F4D7",
            "&:hover": {
              backgroundColor: "#B8D59C",
            },
            border: `1px solid ${mealPlannerTheme.palette.primary.main}`,
            boxShadow:
              "0px 1px 1px -2px rgb(0 0 0 / 20%), 0px 1px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
          },
        },
        {
          props: { variant: "text-link" },
          style: {
            color: mealPlannerTheme.palette.text.main,
            textTransform: "capitalize",
            fontWeight: "bold",
          },
        },
      ],
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={mealPlannerTheme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
