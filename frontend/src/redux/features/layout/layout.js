import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: true,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      return {
        ...state,
        isMobile: action.payload,
      };
    },
  },
});

export const { setIsMobile } = layoutSlice.actions;

export default layoutSlice.reducer;
