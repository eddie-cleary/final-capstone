import React, { useState, useEffect } from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ErrorDisplay from "../shared/ErrorDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowError,
  setShowSuccess,
} from "../../redux/features/forms/errors/errorsSlice";
import { setIsXs, setIsMd, setIsLg } from "../../redux/features/layout/layout";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const matchesMd = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const matchesLg = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.layout.isMobile);

  const gridStyles = (theme) => ({
    display: "grid",
    gridTemplateColumns: "330px 1fr",
    gridTemplateRows: "1fr min-content",
    gridTemplateAreas: `"aside main" "footer footer"`,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateAreas: `"header" "main" "footer"`,
      gridTemplateRows: "min-content 1fr",
    },
    minHeight: "100vh",
    maxHeight: "100vh",
  });

  const header = {
    gridArea: "header",
    p: isMobile ? 1 : 3,
  };

  const aside = (theme) => ({
    gridArea: "aside",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  });

  const main = {
    gridArea: "main",
    padding: isMobile ? "0" : "20px",
    paddingTop: isMobile ? "0" : "50px",
    overflow: "auto",
  };

  const footer = {
    gridArea: "footer",
  };

  useEffect(() => {
    dispatch(setShowError(false));
    dispatch(setShowSuccess(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsXs(matchesXs));
  }, [matchesXs, dispatch]);

  useEffect(() => {
    dispatch(setIsMd(matchesMd));
  }, [matchesMd, dispatch]);

  useEffect(() => {
    dispatch(setIsLg(matchesLg));
  }, [matchesLg, dispatch]);

  return (
    <>
      <Box sx={gridStyles}>
        {matchesXs && (
          <Box component="header" sx={header}>
            <Header open={open} setOpen={setOpen} matches={matchesXs} />
          </Box>
        )}
        <Box component="aside" sx={aside}>
          <Sidebar />
        </Box>
        <Box component="main" sx={main}>
          {children}
        </Box>
        <Box component="footer" sx={footer}>
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
