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
      light: "#E8F4D7",
      dark: "#69A230",
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
      fontWeight: "bold",
    },
    h6: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontWeight: "bold",
      fontSize: 22,
    },
    pageTitle: {
      fontSize: 46,
      fontFamily: ["Lobster", "serif"].join(","),
    },
    textSmall: {
      fontSize: 14,
      fontFamily: ["Roboto, sans-serif"].join(","),
      color: "#5C6755",
    },
    titleSmall: {
      fontSize: 17,
      fontFamily: ["Roboto, sans-serif"].join(","),
      fontWeight: "bold",
      color: "#5C6755",
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
            "&:disabled": {
              backgroundColor: "#E6E9E2",
              border: "1px solid #E6E9E2",
            },
          },
        },
        {
          props: { variant: "btn-warning" },
          style: {
            color: "#5c6755",
            backgroundColor: "#FCE2C7",
            fontWeight: "600",
            border: `1px solid #F8AF66`,
            boxShadow:
              "0px 1px 1px -2px rgb(0 0 0 / 20%), 0px 1px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
            "&:hover": {
              backgroundColor: "#F8AF66",
            },
          },
        },
        {
          props: { variant: "text-link" },
          style: {
            color: mealPlannerTheme.palette.text.main,
            textTransform: "capitalize",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#E8F4D7",
            },
          },
        },
        {
          props: { variant: "nav-link" },
          style: {
            color: mealPlannerTheme.palette.text.main,
            textTransform: "capitalize",
            padding: "12px",
            "&.active": {
              fontWeight: "bold",
              backgroundColor: mealPlannerTheme.palette.primary.main,
            },
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
