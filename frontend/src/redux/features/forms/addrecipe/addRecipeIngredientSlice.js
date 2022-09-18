import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: "",
  number: 0,
  fraction: 0,
  measurement: "",
  isIngredientValid: false,
  isFormValid: false,
  allIngredients: [],
  isIngredientsLoading: true,
  ingredientToCreate: "",
};

export const addRecipeIngredientSlice = createSlice({
  name: "addRecipeIngredient",
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
    setMeasurement: (state, action) => {
      return {
        ...state,
        measurement: action.payload,
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
    setAllIngredients: (state, action) => {
      return {
        ...state,
        allIngredients: action.payload,
      };
    },
    addIngredient: (state, action) => {
      return {
        ...state,
        allIngredients: [...state.allIngredients].push(action.payload),
      };
    },
    deleteIngredient: (state, action) => {
      return {
        ...state,
        allIngredients: state.allIngredients.filter(
          (i, idx) => idx !== action.payload
        ),
      };
    },
    setIsIngredientsLoading: (state, action) => {
      return {
        ...state,
        isIngredientsLoading: action.payload,
      };
    },
    setIngredientToCreate: (state, action) => {
      return {
        ...state,
        ingredientToCreate: action.payload,
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
  setIngredient,
  setNumber,
  setFraction,
  setMeasurement,
  setIsIngredientValid,
  setIsFormValid,
  setAllIngredients,
  setIngredientToCreate,
  addIngredient,
  deleteIngredient,
  setIsIngredientsLoading,
  resetState,
} = addRecipeIngredientSlice.actions;

export default addRecipeIngredientSlice.reducer;
