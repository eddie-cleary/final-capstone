import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeRecipeFromMeal } from "../../../redux/features/forms/mealplan/mealPlanDataSlice";

const MealRecipe = ({ recipe, dayIndex, mealIndex, recipeIndex }) => {
  const dispatch = useDispatch();

  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
      <Button
        sx={{ p: 0, minWidth: "35px", ml: "-30px" }}
        onClick={() =>
          dispatch(removeRecipeFromMeal({ dayIndex, mealIndex, recipeIndex }))
        }
      >
        <RemoveCircle
          color="warning"
          sx={{
            fontSize: "25px",
          }}
        />
      </Button>
      <Typography>{recipe.title}</Typography>
    </Stack>
  );
};

export default MealRecipe;
