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
import { CustomButton } from "../../..";

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
              value={steps[index]}
              onChange={(e) => {
                const newList = [...steps];
                newList[index] = e.target.value;
                dispatch(setSteps(newList));
              }}
              sx={{ flexGrow: 1 }}
            >
              {steps[index]}
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
        <CustomButton onClick={() => dispatch(addStep())} variant="contained">
          <Add fontSize="small" />
        </CustomButton>
      </Stack>
    </>
  );
};

export default StepsList;
