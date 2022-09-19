import { Box, useTheme } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useSelector((state) => state.layout.isMobile);

  const footer = (theme) => ({
    backgroundColor: theme.palette.warning.main,
    width: "100%",
    padding: "15px",
    height: "100%",
    pl: isMobile ? "" : "280px",
  });

  return (
    <Box sx={footer}>
      <Box>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            color: `${theme.palette.white.main}`,
            fontSize: "22px",
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
