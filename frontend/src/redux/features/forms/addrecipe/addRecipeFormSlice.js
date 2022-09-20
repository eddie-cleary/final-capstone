import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileInput: "",
  imgPreview: "",
  isLoading: false,
  isImageUploaded: false,
  isFormValid: false,
  isStepsValid: false,
  isRecipeIngredientsValid: false,
};

export const addRecipeFormSlice = createSlice({
  name: "addRecipeForm",
  initialState,
  reducers: {
    setFileInput: (state, action) => {
      return {
        ...state,
        fileInput: action.payload,
      };
    },
    setImgPreview: (state, action) => {
      return {
        ...state,
        imgPreview: action.payload,
      };
    },
    setIsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setIsImageUploaded: (state, action) => {
      return {
        ...state,
        isImageUploaded: action.payload,
      };
    },
    setIsFormValid: (state, action) => {
      return {
        ...state,
        isFormValid: action.payload,
      };
    },
    setIsStepsValid: (state, action) => {
      return {
        ...state,
        isStepsValid: action.payload,
      };
    },
    setIsRecipeIngredientsValid: (state, action) => {
      return {
        ...state,
        isRecipeIngredientsValid: action.payload,
      };
    },
  },
});

export const {
  setFileInput,
  setImgPreview,
  setIsLoading,
  setIsImageUploaded,
  setIsFormValid,
  setIsStepsValid,
  setIsRecipeIngredientsValid,
} = addRecipeFormSlice.actions;

export default addRecipeFormSlice.reducer;
