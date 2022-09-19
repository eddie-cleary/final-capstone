import React from "react";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

const PageLayout = ({ children }) => {
  const isXs = useSelector((state) => state.layout.isXs);

  const pageLayoutStyles = {
    maxWidth: "1900px",
    width: "100%",
    px: isXs ? 0 : 5,
  };

  return (
    <Stack component="section" alignItems="center" sx={pageLayoutStyles}>
      {children}
    </Stack>
  );
};

export default PageLayout;
