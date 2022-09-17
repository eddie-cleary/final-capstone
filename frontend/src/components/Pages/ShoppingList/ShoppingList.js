import React from "react";
import { convertToMeasurement } from "../../../shared/conversions";
import { Stack, Typography, Paper } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const ShoppingList = ({ mealplan }) => {
  let shoppingListObj = {};

  // makes an object containing a key for each ingredient and value of its quantity in 1/8 teaspoons
  // takes into account the amount of servings for each meal
  if (mealplan) {
    for (let day of mealplan?.days) {
      for (let meal of day.meals) {
        for (let mealrecipe of meal.mealRecipes) {
          let servings = mealrecipe.servings;
          for (let recipeIngredient of mealrecipe.recipe.recipeIngredients) {
            const ingredient = recipeIngredient.name;
            if (shoppingListObj.hasOwnProperty(ingredient)) {
              shoppingListObj[ingredient] +=
                recipeIngredient.quantity * servings;
            } else {
              shoppingListObj[ingredient] =
                recipeIngredient.quantity * servings;
            }
          }
        }
      }
    }
  }

  // convert quantities to readable measurements using convertToMeasurement function
  if (shoppingListObj) {
    for (let key of Object.keys(shoppingListObj)) {
      shoppingListObj[key] = convertToMeasurement(shoppingListObj[key]);
    }
  }

  const Ingredient = ({ ingredient }) => {
    return (
      <Typography
        sx={{ mt: 3, display: "flex", alignItems: "center" }}
        variant="h5"
        element="h3"
      >
        <CheckBoxOutlineBlankIcon sx={{ mr: 2 }} />
        {`${ingredient}: ${shoppingListObj[ingredient]}`}
      </Typography>
    );
  };

  const ingredientComponents = Object.keys(shoppingListObj).map(
    (ingredientName, index) => (
      <Ingredient key={index} ingredient={ingredientName} />
    )
  );

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          pt: 5,
        }}
        elevation={5}
      >
        <Stack alignItems="center">
          <Typography
            textAlign="center"
            variant="h3"
            element="h1"
            sx={{ mb: 3 }}
          >{`${mealplan?.title} Shopping List`}</Typography>
          {ingredientComponents}
        </Stack>
      </Stack>
    </>
  );
};

export default ShoppingList;
