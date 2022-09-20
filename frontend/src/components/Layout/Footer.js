import { Box, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const isLg = useSelector((state) => state.layout.isLg);
  const location = useLocation();
  const [isLocationHome, setIsLocationHome] = useState(false);

  const footer = (theme) => ({
    backgroundColor: theme.palette.warning.main,
    width: "100%",
    padding: "15px",
    height: "100%",
    pl: !isLg || !isLocationHome ? "" : "320px",
  });

  useEffect(() => {
    if (location.pathname === "/") {
      setIsLocationHome(true);
    }
  }, [location]);

  return (
    <Box sx={footer}>
      <Box>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            color: `${theme.palette.white.main}`,
            fontSize: isLg ? "22px" : "18px",
            letterSpacing: "1px",
          }}
        >
          Created by Edward Cleary, Chantele Lohr, and Brandon Vo
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
