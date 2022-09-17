import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const PageTitle = ({ title }) => {
  const isMobile = useSelector((state) => state.layout.isMobile);

  return (
    <Typography
      variant={isMobile ? "h4" : "h3"}
      element="h1"
      sx={{ textAlign: "center", mb: 7, mt: isMobile ? 2 : 0 }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
