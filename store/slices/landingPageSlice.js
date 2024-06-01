import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  landingPages: [],
  status: "idle",
  error: null,
};

const fetchLandingPages = createAsyncThunk(
  "landingPages/fetchLandingPages",
  async (userId) => {
    const response = await fetch(
      `http://localhost:5000/landingPages?userId=${userId}`
    );
    const data = await response.json();
    console.log("-----dta", data);
    return data;
  }
);

const landingPageSlice = createSlice({
  name: "landingPages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingPages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLandingPages.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload, "ooo");
        state.landingPages = action.payload;
      })
      .addCase(fetchLandingPages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchLandingPages };
export default landingPageSlice.reducer;
