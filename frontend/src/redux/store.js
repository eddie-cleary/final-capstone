import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import addRecipeDataReducer from "./features/forms/addrecipe/addRecipeDataSlice";
import addRecipeFormReducer from "./features/forms/addrecipe/addRecipeFormSlice";
import addRecipeIngredientReducer from "./features/forms/addrecipe/addRecipeIngredientSlice";
import mealPlanDataReducer from "./features/forms/mealplan/mealPlanDataSlice";
import errorsReducer from "./features/forms/errors/errorsSlice";
import recipesDataReducer from "./features/recipes/recipesDataSlice";
import layoutReducer from "./features/layout/layoutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addRecipeData: addRecipeDataReducer,
    addRecipeForm: addRecipeFormReducer,
    addRecipeIngredient: addRecipeIngredientReducer,
    mealPlanData: mealPlanDataReducer,
    errors: errorsReducer,
    recipes: recipesDataReducer,
    layout: layoutReducer,
  },
});
