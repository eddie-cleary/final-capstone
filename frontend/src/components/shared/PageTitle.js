import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const PageTitle = ({ title }) => {
  const isXs = useSelector((state) => state.layout.isXs);

  return (
    <Typography
      variant="pageTitle"
      element="h1"
      sx={{
        textAlign: "center",
        mt: isXs ? 2 : 0,
        mb: isXs ? 0 : 4,
        textTransform: "capitalize",
      }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
