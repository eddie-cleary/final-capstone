import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  servings: 1,
  prepTime: "",
  cookTime: "",
  imgId: "",
  steps: [{ info: "" }],
  recipeIngredients: [],
  liked: true,
};

export const addRecipeDataSlice = createSlice({
  name: "addRecipeDataSlice",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      return {
        ...state,
        title: action.payload,
      };
    },
    setDescription: (state, action) => {
      return {
        ...state,
        description: action.payload,
      };
    },
    setServings: (state, action) => {
      return {
        ...state,
        servings: action.payload,
      };
    },
    setPrepTime: (state, action) => {
      return {
        ...state,
        prepTime: action.payload,
      };
    },
    setCookTime: (state, action) => {
      return {
        ...state,
        cookTime: action.payload,
      };
    },
    setImgId: (state, action) => {
      return {
        ...state,
        imgId: action.payload,
      };
    },
    addStep: (state, action) => {
      return {
        ...state,
        steps: state.steps.add(action.payload),
      };
    },
    deleteStep: (state) => {
      return {
        ...state,
        steps: [...state.steps].splice(0, state.steps.length - 1),
      };
    },
    addRecipeIngredient: (state, action) => {
      return {
        ...state,
        recipeIngredients: state.recipeIngredients.add(action.payload),
      };
    },
    deleteRecipeIngredient: (state, action) => {
      return {
        ...state,
        recipeIngredients: state.recipeIngredients.filter(
          (i, idx) => idx !== action.payload
        ),
      };
    },
    setLiked: (state, action) => {
      return {
        ...state,
        liked: action.payload,
      };
    },
    resetData: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setTitle,
  setDescription,
  setServings,
  setPrepTime,
  setCookTime,
  setImgId,
  addStep,
  deleteStep,
  addRecipeIngredient,
  deleteRecipeIngredient,
  setLiked,
  resetData,
} = addRecipeDataSlice.actions;

export default addRecipeDataSlice.reducer;
