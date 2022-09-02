import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    username: "",
    authorities: ["USER"],
  },
  token: undefined,
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
        id: null,
        username: "",
        authorities: [],
      };
    },
    addToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { addUser, deleteUser, addToken } = authSlice.actions;

export default authSlice.reducer;
