import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import landingPageReducer from "@/store/slices/landingPageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    landingPages: landingPageReducer,
  },
});

export default store;
