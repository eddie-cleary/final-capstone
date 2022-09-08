import { Box } from "@mui/material";

import React from "react";
import { Typography } from "@mui/material";

const footer = (theme) => ({
  background: "#71af47",
  color: "#142d4c",
  width: "100%",
  position: "fixed",
  bottom: 0,
  paddingTop: "10px",
  height: "40px",
  [theme.breakpoints.down("md")]: {
    paddingTop: "2px",
    height: "40px",
  },
});

const Footer = () => {
  return (
    <Box sx={footer}>
      <Typography textAlign="center">
        My Digital Meal Planner &reg; {new Date().getFullYear()} <br />
      </Typography>
    </Box>
  );
};

export default Footer;
