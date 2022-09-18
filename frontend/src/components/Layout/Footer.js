import { Box, useTheme } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";

const footer = (theme) => ({
  backgroundColor: theme.palette.warning.main,
  width: "100%",
  padding: "15px",
  height: "100%",
});

const Footer = () => {
  const theme = useTheme();

  return (
    <Box sx={footer}>
      <Box sx={{ maxWidth: "2560px" }}>
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
