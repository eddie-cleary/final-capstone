import React from "react";
import { Stack, Button, Typography, Box } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeRecipeFromMeal } from "../../../redux/features/forms/mealplan/mealPlanDataSlice";
import { CustomButton } from "../../..";

const MealRecipe = ({ recipe, dayIndex, mealIndex, recipeIndex }) => {
  const dispatch = useDispatch();

  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
      <CustomButton
        sx={{ p: 0, minWidth: "35px" }}
        onClick={() =>
          dispatch(removeRecipeFromMeal({ dayIndex, mealIndex, recipeIndex }))
        }
      >
        <RemoveCircle
          color="warning"
          sx={{
            fontSize: "17px",
          }}
        />
      </CustomButton>
      <Stack
        sx={{ width: "calc(100% - 20px)" }}
        direction="row"
        alignItems="center"
      >
        <Typography sx={{ mr: 1 }}>{recipe.servings}</Typography>
        <Typography sx={{ width: "calc(100% - 35px)", overflow: "hidden" }}>
          {recipe.title}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MealRecipe;
