import React from "react";
import { Stack, InputLabel, Typography, Button } from "@mui/material";
import { convertToMeasurement } from "../../../shared/conversions";
import { useDispatch } from "react-redux";
import { deleteRecipeIngredient } from "../../../redux/features/forms/addrecipe/addRecipeDataSlice";

const ChosenIngredient = ({ index, data }) => {
  const dispatch = useDispatch();

  const deleteChosenIngredient = () => {
    dispatch(deleteRecipeIngredient(index));
  };

  return (
    <Stack direction="row" sx={{ flexWrap: "nowrap", alignItems: "center" }}>
      <Stack sx={{ flexGrow: 1 }}>
        <InputLabel>&nbsp;</InputLabel>
        <Typography sx={{ textTransform: "capitalize" }}>
          {data.name} {convertToMeasurement(data.quantity, data.liquid)}
        </Typography>
      </Stack>
      <Button
        onClick={deleteChosenIngredient}
        variant="outlined"
        sx={{ height: "56px", ml: 2, alignSelf: "flex-end" }}
      >
        -
      </Button>
    </Stack>
  );
};

export default ChosenIngredient;
