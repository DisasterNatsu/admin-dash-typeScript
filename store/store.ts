// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import navReducer from "@/slices/navSlice";
import chapterModalReducer from "@/slices/chapterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
    chapter: chapterModalReducer,

    // Add other reducers as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
