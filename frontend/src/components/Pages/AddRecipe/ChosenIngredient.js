import React, { useState, useEffect } from "react";
import { Stack, InputLabel, Typography, Button } from "@mui/material";
import { convertToMeasurement } from "../../../shared/conversions";

const ChosenIngredient = ({
  index,
  data,
  recipeIngredients,
  setRecipeIngredients,
}) => {
  const deleteChosenIngredient = () => {
    const newList = recipeIngredients.filter(
      (ingredient, idx) => idx !== index
    );
    setRecipeIngredients(newList);
  };

  return (
    <Stack direction="row" sx={{ flexWrap: "nowrap", alignItems: "center" }}>
      <Stack sx={{ flexGrow: 1 }}>
        <InputLabel>&nbsp;</InputLabel>
        <Typography variant="h6">
          {data.name} {convertToMeasurement(data.quantity)}
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
