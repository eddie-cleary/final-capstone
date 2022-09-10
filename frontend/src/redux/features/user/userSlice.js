import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedRecipes: new Set(),
  myRecipes: new Set(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLikedRecipes: (state, action) => {
      return {
        ...state,
        likedRecipes: new Set(action.payload),
      };
    },
    setMyRecipes: (state, action) => {
      return {
        ...state,
        myRecipes: new Set(action.payload),
      };
    },
  },
});

export const { initLikedRecipes, addLikedRecipe, removeLikedRecipe } =
  userSlice.actions;

export default userSlice.reducer;
