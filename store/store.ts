// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import { setUser } from "@/slices/authSlice";
import navReducer from "@/slices/navSlice";

const combinedReducers = combineReducers({
  setUser,
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,

    // Add other reducers as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
