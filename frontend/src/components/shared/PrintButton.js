import * as React from "react";
import PrintIcon from "@mui/icons-material/Print";
import { Box } from "@mui/material";

const PrintButton = ({ recipe }) => {
  const handleClickPrint = () => {
    return window.print();
  };

  return (
    <Box
      sx={{
        "@media print ": {
          display: "none",
        },
      }}
    >
      <PrintIcon onClick={handleClickPrint} />
    </Box>
  );
};

export default PrintButton;
