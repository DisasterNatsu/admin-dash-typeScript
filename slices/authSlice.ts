// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userName: string | null;
  email: string | null;
}

const initialState: AuthState = {
  userName: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
