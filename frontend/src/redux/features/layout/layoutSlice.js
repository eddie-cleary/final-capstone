import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isXs: false,
  isMd: false,
  isLg: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setIsXs: (state, action) => {
      return {
        ...state,
        isXs: action.payload,
      };
    },
    setIsMd: (state, action) => {
      return {
        ...state,
        isMd: action.payload,
      };
    },
    setIsLg: (state, action) => {
      return {
        ...state,
        isLg: action.payload,
      };
    },
  },
});

export const { setIsXs, setIsMd, setIsLg } = layoutSlice.actions;

export default layoutSlice.reducer;
