// navSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  open: boolean;
}

const initialState: NavState = {
  open: true,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = !state.open;
    },
  },
});

export const { setOpen } = navSlice.actions;

export default navSlice.reducer;
