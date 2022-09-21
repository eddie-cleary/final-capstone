import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  description: "",
  recipeCategories: [],
  servings: 1,
  prepTime: "",
  cookTime: "",
  imgId: null,
  ingredient: "",
  steps: [""],
  recipeIngredients: [],
  liked: false,
};

export const addRecipeDataSlice = createSlice({
  name: "addRecipeData",
  initialState,
  reducers: {
    setName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    setDescription: (state, action) => {
      return {
        ...state,
        description: action.payload,
      };
    },
    setRecipeCategories: (state, action) => {
      return {
        ...state,
        recipeCategories: action.payload,
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
    addStep: (state) => {
      return {
        ...state,
        steps: [...state.steps, ""],
      };
    },
    deleteStep: (state) => {
      return {
        ...state,
        steps: [...state.steps].splice(0, state.steps.length - 1),
      };
    },
    setSteps: (state, action) => {
      return {
        ...state,
        steps: action.payload,
      };
    },
    setIngredient: (state, action) => {
      return {
        ...state,
        ingredient: action.payload,
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
    setRecipeIngredients: (state, action) => {
      return {
        ...state,
        recipeIngredients: action.payload,
      };
    },
    setLiked: (state, action) => {
      return {
        ...state,
        liked: action.payload,
      };
    },
    setRecipeFormData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setName,
  setDescription,
  setRecipeCategories,
  setServings,
  setPrepTime,
  setCookTime,
  setImgId,
  addStep,
  deleteStep,
  setSteps,
  setIngredient,
  addRecipeIngredient,
  deleteRecipeIngredient,
  setRecipeIngredients,
  setLiked,
  resetState,
  setRecipeFormData,
} = addRecipeDataSlice.actions;

export default addRecipeDataSlice.reducer;
