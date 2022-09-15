import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successMsg: "",
  showSuccess: false,
  errorMsg: "",
  showError: false,
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setShowSuccess(state, action) {
      state.showSuccess = action.payload;
    },
    setSuccessMsg(state, action) {
      state.successMsg = action.payload;
    },
    setShowError(state, action) {
      state.showError = action.payload;
    },
    setErrorMsg(state, action) {
      state.errorMsg = action.payload;
    },
  },
});

export const { setShowSuccess, setSuccessMsg, setShowError, setErrorMsg } =
  errorsSlice.actions;

export default errorsSlice.reducer;
