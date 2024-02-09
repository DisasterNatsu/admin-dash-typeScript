// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ChapterModalState {
  open: boolean;
}

const initialState: ChapterModalState = {
  open: false,
};

const chapterModalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setChapterModalOpen: (state) => {
      state.open = !state.open;
    },
  },
});

export const { setChapterModalOpen } = chapterModalSlice.actions;

export default chapterModalSlice.reducer;
