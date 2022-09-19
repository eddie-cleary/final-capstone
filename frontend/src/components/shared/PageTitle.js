import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const PageTitle = ({ title }) => {
  const isMobile = useSelector((state) => state.layout.isMobile);

  return (
    <Typography
      variant="pageTitle"
      element="h1"
      sx={{ textAlign: "center", mb: 4, mt: isMobile ? 2 : 0 }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
