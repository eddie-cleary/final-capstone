import React from "react";
import { convertToMeasurement } from "../../../shared/conversions";
import { Stack, Typography, Paper } from "@mui/material";

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
            const ingredient = recipeIngredient.ingredient;
            if (shoppingListObj.hasOwnProperty(ingredient.name)) {
              shoppingListObj[ingredient.name] +=
                recipeIngredient.quantity * servings;
            } else {
              shoppingListObj[ingredient.name] =
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
      <Typography sx={{ mt: 3 }} variant="h5" element="h3">
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
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        pt: 5,
      }}
      elevation={5}
    >
      <Stack alignItems="center">
        <Typography
          variant="h3"
          element="h1"
        >{`${mealplan?.title} Shopping List`}</Typography>
        {ingredientComponents}
      </Stack>
    </Paper>
  );
};

export default ShoppingList;
