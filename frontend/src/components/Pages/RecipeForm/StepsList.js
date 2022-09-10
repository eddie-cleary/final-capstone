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
import { useSelector, useDispatch } from "react-redux";
import {
  setSteps,
  addStep,
  deleteStep,
} from "../../../redux/features/forms/addrecipe/addRecipeDataSlice";

const btnStyle = {
  border: "solid .5px #142d4c",
  color: "#385170",
  background: "#9fcf6f",
  "&:hover": {
    boxShadow: 8,
    background: "#71af47",
    border: "solid .5px #9fd3c7",
  },
};

const StepsList = () => {
  const steps = useSelector((state) => state.addRecipeData.steps);
  const dispatch = useDispatch();

  let displaySteps;
  if (steps.length > 0) {
    displaySteps = steps.map((step, index) => {
      return (
        <Box key={index + 1}>
          <Stack direction="row" alignItems="stretch" sx={{ mt: 2 }}>
            <InputLabel sx={{ mr: 2, alignSelf: "center" }}>
              {index + 1}
            </InputLabel>
            <TextField
              value={steps[index].info}
              onChange={(e) => {
                const newList = [...steps];
                newList[index] = { info: e.target.value };
                dispatch(setSteps(newList));
              }}
              sx={{ flexGrow: 1 }}
            >
              {steps.index}
            </TextField>
            <Button
              onClick={() => dispatch(deleteStep())}
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
          onClick={() => dispatch(addStep())}
          sx={btnStyle}
          variant="contained"
        >
          <Add fontSize="small" />
        </Button>
      </Stack>
    </>
  );
};

export default StepsList;
