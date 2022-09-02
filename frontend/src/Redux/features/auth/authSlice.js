import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    username: "",
    authorities: ["USER"],
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
          authorities: action.payload.authorities,
        },
      };
    },
    deleteUser: (state) => {
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
