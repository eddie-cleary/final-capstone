import React from "react";
import ChosenIngredient from "./ChosenIngredient";
import { Stack } from "@mui/system";

const ChosenIngredientsList = ({ recipeIngredients, setRecipeIngredients }) => {
  const ingredients = recipeIngredients.map((ingredient, index) => {
    return (
      <ChosenIngredient
        index={index}
        data={ingredient}
        recipeIngredients={recipeIngredients}
        setRecipeIngredients={setRecipeIngredients}
        key={index}
      />
    );
  });

  return <Stack>{ingredients}</Stack>;
};

export default ChosenIngredientsList;
