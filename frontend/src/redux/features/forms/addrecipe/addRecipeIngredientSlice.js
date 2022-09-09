import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: "",
  number: 0,
  fraction: 0,
  measurementUnit: "",
  isIngredientValid: false,
  isFormValid: false,
  allIngredients: [],
  isIngredientsLoading: true,
};

export const addRecipeIngredientSlice = createSlice({
  name: "addRecipeIngredientSlice",
  initialState,
  reducers: {
    setIngredient: (state, action) => {
      return {
        ...state,
        ingredient: action.payload,
      };
    },
    setNumber: (state, action) => {
      return {
        ...state,
        number: action.payload,
      };
    },
    setFraction: (state, action) => {
      return {
        ...state,
        fraction: action.payload,
      };
    },
    setMeasurementUnit: (state, action) => {
      return {
        ...state,
        measurementUnit: action.payload,
      };
    },
    setIsIngredientValid: (state, action) => {
      return {
        ...state,
        isIngredientValid: action.payload,
      };
    },
    setIsFormValid: (state, action) => {
      return {
        ...state,
        isFormValid: action.payload,
      };
    },
    initAllIngredients: (state, action) => {
      return {
        ...state,
        allIngredients: action.payload,
      };
    },
    setIsIngredientsLoading: (state, action) => {
      return {
        ...state,
        isIngredientsLoading: action.payload,
      };
    },
  },
});

export const {
  setIngredient,
  setNumber,
  setFraction,
  setMeasurementUnit,
  setIsIngredientValid,
  setIsFormValid,
  initAllIngredients,
  setIsIngredientsLoading,
} = addRecipeIngredientSlice.actions;

export default addRecipeIngredientSlice.reducer;
