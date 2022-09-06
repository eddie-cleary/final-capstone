import React from "react";
import Ingredient from "./Ingredient";
import { Stack } from "@mui/system";

const ChosenIngredients = ({ ingredientList, setIngredientList }) => {
  const ingredients = ingredientList.map((ingredient, index) => {
    return (
      <Ingredient
        index={index}
        data={ingredient}
        ingredientList={ingredientList}
        setIngredientList={setIngredientList}
        key={index}
      />
    );
  });

  return <Stack>{ingredients}</Stack>;
};

export default ChosenIngredients;
