import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  user: null,
  isAuthenticated: false,
};
export const getUserIdFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.userId : null;
  }
  return null;
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      const userId = uuidv4();
      state.user = { ...action.payload, userId: userId };
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    setAuth(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setAuth } = authSlice.actions;
export default authSlice.reducer;
