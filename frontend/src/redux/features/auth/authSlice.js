import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    username: "",
    appUserRoles: [],
  },
  token: null,
  isModalLogin: false,
  isModalRegister: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          appUserRoles: action.payload.appUserRoles,
        },
      };
    },
    deleteUser: (state) => {
      localStorage.removeItem("token");
      return {
        ...state,
        user: {
          id: null,
          username: "",
          authorities: [],
        },
      };
    },
    addToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    },
    showModalLogin: (state, action) => {
      return {
        ...state,
        isModalLogin: action.payload,
      };
    },
    showModalRegister: (state, action) => {
      return {
        ...state,
        isModalRegister: action.payload,
      };
    },
  },
});

export const {
  addUser,
  deleteUser,
  addToken,
  showModalLogin,
  showModalRegister,
} = authSlice.actions;

export default authSlice.reducer;
