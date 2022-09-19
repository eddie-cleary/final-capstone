import * as React from "react";
import PrintIcon from "@mui/icons-material/Print";
import Box from "@mui/material";

const PrintButton = ({ recipe }) => {
  return (
    <Box>
      <PrintIcon onClick={() => window.print()} />
    </Box>
  );
};

export default PrintButton;
