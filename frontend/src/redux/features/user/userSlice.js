import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedRecipes: new Set(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initLikedRecipes: (state, action) => {
      return {
        ...state,
        likedRecipes: new Set(action.payload),
      };
    },
    addLikedRecipe: (state, action) => {
      return {
        ...state,
        likedRecipes: state.likedRecipes.add(action.payload),
      };
    },
    removeLikedRecipe: (state, action) => {
      return {
        ...state,
        likedRecipes: state.likedRecipes.delete(action.payload),
      };
    },
  },
});

export const { initLikedRecipes, addLikedRecipe, removeLikedRecipe } =
  userSlice.actions;

export default userSlice.reducer;
