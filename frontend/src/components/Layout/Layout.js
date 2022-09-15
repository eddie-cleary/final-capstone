import React, { useState, useEffect } from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ErrorDisplay from "../shared/ErrorDisplay";
import { useDispatch } from "react-redux";
import {
  setShowError,
  setShowSuccess,
} from "../../redux/features/forms/errors/errorsSlice";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery("(min-width: 600px)");
  const dispatch = useDispatch();

  const gridStyles = (theme) => ({
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gridTemplateRows: "100px 1fr 100px",
    gridTemplateAreas: `"header header" "aside main" "footer footer"`,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateAreas: `"header" "main" "footer"`,
    },
    minHeight: "100vh",
  });

  const header = {
    gridArea: "header",
  };

  const aside = (theme) => ({
    gridArea: "aside",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  });

  const main = {
    gridArea: "main",
    padding: "20px",
    paddingTop: "50px",
  };

  const footer = {
    gridArea: "footer",
  };

  useEffect(() => {
    dispatch(setShowError(false));
    dispatch(setShowSuccess(false));
  }, [dispatch]);

  return (
    <>
      <Box sx={gridStyles}>
        <Box sx={header}>
          <Header open={open} setOpen={setOpen} matches={matches} />
        </Box>
        <Box sx={aside}>
          <Sidebar />
        </Box>
        <Box sx={main}>{children}</Box>
        <Box sx={footer}>
          <Footer />
        </Box>
      </Box>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Sidebar />
      </Drawer>
      <ErrorDisplay />
    </>
  );
};

export default Layout;
