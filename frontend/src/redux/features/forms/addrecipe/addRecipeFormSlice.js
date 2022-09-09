import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileInput: "",
  imgPreview: "",
  isLoading: false,
  isImageUploading: false,
  successMsg: "",
  showSuccess: false,
  errMsg: "",
  showError: false,
  isFormValid: false,
  isStepsValid: false,
  isRecipeIngredientsValid: false,
};

export const addRecipeFormSlice = createSlice({
  name: "addRecipeFormSlice",
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
    setIsImageUploading: (state, action) => {
      return {
        ...state,
        isImageUploading: action.payload,
      };
    },
    setSuccessMsg: (state, action) => {
      return {
        ...state,
        successMsg: action.paload,
      };
    },
    setErrMsg: (state, action) => {
      return {
        ...state,
        errMsg: action.payload,
      };
    },
    setShowError: (state, action) => {
      return {
        ...state,
        showError: action.payload,
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
  setIsImageUploading,
  setSuccessMsg,
  setErrMsg,
  setShowError,
  setIsFormValid,
  setIsStepsValid,
  setIsRecipeIngredientsValid,
} = addRecipeFormSlice.actions;

export default addRecipeFormSlice.reducer;
