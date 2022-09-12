import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  styled,
  Button,
} from "@mui/material";

const mealPlannerTheme = createTheme({
  palette: {
    primary: {
      main: "#63A430",
    },
    warning: {
      main: "#F08F31",
    },
  },
});

export const CustomButton = styled(Button)(({ theme }) => ({
  color: "#5C6755",
  fontWeight: "600",
  backgroundColor: "#E8F4D7",
  "&:hover": {
    backgroundColor: "#B8D59C",
  },
  boxShadow:
    "0px 1px 1px -2px rgb(0 0 0 / 20%), 0px 1px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
}));

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
