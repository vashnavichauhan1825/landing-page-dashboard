import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      const userId = uuidv4();
      state.user = { ...action.payload, userId: userId };
      state.isAuthenticated = true;
      console.log(state.user);
      localStorage.setItem("user", JSON.stringify(state.user));
      console.log("login working");
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      console.log("logiout working");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
