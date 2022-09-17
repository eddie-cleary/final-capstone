import { Box, useTheme } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";

const footer = (theme) => ({
  backgroundColor: theme.palette.warning.main,
  width: "100%",
  p: 4,
});

const Footer = () => {
  const theme = useTheme();

  return (
    <Box sx={footer}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ color: `${theme.palette.white.main}`, fontSize: "27px" }}
      >
        Created by Edward Cleary, Chantele Lohr, and Brandon Vo
      </Typography>
    </Box>
  );
};

export default Footer;
