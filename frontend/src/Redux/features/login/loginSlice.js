import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginModal: false,
  isRegisterModal: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    showLoginModal: (state, action) => {
      return {
        ...state,
        showLoginModal: action.payload,
      };
    },
    showRegisterModal: (state, action) => {
      return {
        ...state,
        showRegisterModal: action.payload,
      };
    },
  },
});

export const { showLoginModal, showRegisterModal } = loginSlice.actions;

export default loginSlice.reducer;
