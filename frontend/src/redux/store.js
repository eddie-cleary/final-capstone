import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import addRecipeDataReducer from "./features/forms/addrecipe/addRecipeDataSlice";
import addRecipeFormReducer from "./features/forms/addrecipe/addRecipeFormSlice";
import addRecipeIngredientReducer from "./features/forms/addrecipe/addRecipeIngredientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addRecipeData: addRecipeDataReducer,
    addRecipeForm: addRecipeFormReducer,
    addRecipeIngredient: addRecipeIngredientReducer,
  },
});
