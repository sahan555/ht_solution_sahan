import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  username: string | null;
  token: string | null;
};

const initialState: AuthState = {
  username: localStorage.getItem("username"),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ username: string; token: string }>
    ) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("token", action.payload.token);
    },
    clearAuthData: (state) => {
      state.username = null;
      state.token = null;
      localStorage.removeItem("username");
      localStorage.removeItem("token");
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
