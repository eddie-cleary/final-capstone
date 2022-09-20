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
        mb: 4,
        mt: isXs ? 2 : 0,
        textTransform: "capitalize",
      }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
