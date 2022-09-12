import React from "react";
import MealRecipe from "./MealRecipe";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Button } from "@mui/material";
import { showRecipesModal } from "../../../redux/features/forms/mealplan/mealPlanDataSlice";

const MealRecipesList = ({ dayIndex, mealIndex }) => {
  const dispatch = useDispatch();

  const mealRecipes = useSelector(
    (state) => state.mealPlanData.days[dayIndex][mealIndex].recipes
  );

  const mealRecipeComponents = mealRecipes.map((mealRecipe, idx) => (
    <MealRecipe
      recipe={mealRecipe}
      dayIndex={dayIndex}
      mealIndex={mealIndex}
      key={idx}
      recipeIndex={idx}
    />
  ));

  return (
    <Stack>
      {mealRecipeComponents}
      <Button
        sx={{ mt: 2 }}
        onClick={() => dispatch(showRecipesModal({ dayIndex, mealIndex }))}
        variant="contained"
      >
        Add recipe
      </Button>
    </Stack>
  );
};

export default MealRecipesList;
