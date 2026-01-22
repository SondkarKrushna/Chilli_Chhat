import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("role"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("role", action.payload);
    },
    logout: (state) => {
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("role");
    },
  },
});

export const { setRole, logout } = authSlice.actions;
export default authSlice.reducer;
