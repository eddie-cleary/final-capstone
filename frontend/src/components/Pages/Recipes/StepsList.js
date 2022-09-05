import React from "react";
import {
  Box,
  Stack,
  InputLabel,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const StepsList = ({ stepsList, setStepsList }) => {
  let displaySteps;
  if (stepsList.length > 0) {
    displaySteps = stepsList.map((step, index) => {
      return (
        <Box key={index + 1}>
          <Stack direction="row" alignItems="stretch" sx={{ mt: 2 }}>
            <InputLabel sx={{ mr: 2, alignSelf: "center" }}>
              {index + 1}
            </InputLabel>
            <TextField
              onChange={(e) => {
                const newList = [...stepsList];
                newList[index] = e.target.value;
                setStepsList(newList);
              }}
              sx={{ flexGrow: 1 }}
            >
              {stepsList.index}
            </TextField>
            <Button
              onClick={() =>
                setStepsList([...stepsList].splice(0, stepsList.length - 1))
              }
              disabled={index === 0 ? true : false}
              sx={{ ml: 2 }}
              variant="outlined"
              color="warning"
            >
              <Remove fontSize="small" />
            </Button>
          </Stack>
        </Box>
      );
    });
  }

  return (
    <>
      <Typography sx={{ mt: 2 }}>Steps</Typography>
      <Stack>{displaySteps}</Stack>
      <Stack direction="row" sx={{ mt: 2 }} justifyContent="center">
        <Button
          onClick={() => setStepsList([...stepsList, ""])}
          sx={{ px: 3 }}
          variant="contained"
        >
          <Add fontSize="small" />
        </Button>
      </Stack>
    </>
  );
};

export default StepsList;
