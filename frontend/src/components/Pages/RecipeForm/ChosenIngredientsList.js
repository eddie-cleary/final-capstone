import React from "react";
import ChosenIngredient from "./ChosenIngredient";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";

const ChosenIngredientsList = () => {
  const recipeIngredients = useSelector(
    (state) => state.addRecipeData.recipeIngredients
  );

  const ingredients = recipeIngredients.map((ingredient, index) => {
    return <ChosenIngredient index={index} data={ingredient} key={index} />;
  });

  return <Stack sx={{ mt: 2 }}>{ingredients}</Stack>;
};

export default ChosenIngredientsList;
