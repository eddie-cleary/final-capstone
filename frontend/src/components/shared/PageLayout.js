import React from "react";
import { Stack, Box } from "@mui/material";
import { useSelector } from "react-redux";

const PageLayout = ({ children }) => {
  const isMobile = useSelector((state) => state.layout.isMobile);

  const pageLayoutStyles = {
    maxWidth: "1900px",
    width: "100%",
    px: isMobile ? 0 : 5,
  };

  return (
    <Stack component="section" alignItems="center" sx={pageLayoutStyles}>
      {children}
    </Stack>
  );
};

export default PageLayout;
