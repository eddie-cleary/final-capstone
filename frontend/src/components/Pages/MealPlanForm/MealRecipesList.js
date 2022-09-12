import React from "react";
import MealRecipe from "./MealRecipe";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Button } from "@mui/material";
import { showRecipesModal } from "../../../redux/features/forms/mealplan/mealPlanDataSlice";
import { CustomButton } from "../../..";

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
    <Stack alignItems="center" sx={{ width: "100%" }}>
      {mealRecipeComponents}
      <CustomButton
        sx={{ mt: 2 }}
        onClick={() => dispatch(showRecipesModal({ dayIndex, mealIndex }))}
        variant="contained"
      >
        Add recipe
      </CustomButton>
    </Stack>
  );
};

export default MealRecipesList;
