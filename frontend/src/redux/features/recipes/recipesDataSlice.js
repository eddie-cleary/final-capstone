import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRecipes: [],
};

export const recipesDataSlice = createSlice({
  name: "recipesData",
  initialState,
  reducers: {
    setAllRecipes(state, action) {
      state.allRecipes = action.payload;
    },
    resetState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setAllRecipes, resetState } = recipesDataSlice.actions;

export default recipesDataSlice.reducer;
