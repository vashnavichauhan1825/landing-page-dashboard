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
    console.log("-----data", data);
    return data;
  }
);

const createLandingPage = createAsyncThunk(
  "landingPages/createLandingPage",
  async ({ userId, landingPageData }) => {
    const response = await fetch("http://localhost:5000/landingPages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...landingPageData, userId }),
    });
    const data = await response.json();
    return data;
  }
);

const updateLandingPageStatus = createAsyncThunk(
  "landingPages/updateLandingPageStatus",
  async ({ userId, landingPageId }) => {
    await fetch(`http://localhost:5000/landingPages/${landingPageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Live" }),
    });

    const response = await fetch(
      `http://localhost:5000/landingPages?userId=${userId}`
    );
    const landingPages = await response.json();

    for (const page of landingPages) {
      if (page.id !== landingPageId) {
        await fetch(`http://localhost:5000/landingPages/${page.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Draft" }),
        });
      }
    }

    const updatedResponse = await fetch(
      `http://localhost:5000/landingPages?userId=${userId}`
    );
    const updatedData = await updatedResponse.json();
    return updatedData;
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
        state.landingPages = action.payload;
      })
      .addCase(fetchLandingPages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(createLandingPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLandingPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.landingPages.push(action.payload);
      })
      .addCase(createLandingPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(updateLandingPageStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateLandingPageStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.landingPages = action.payload;
      })
      .addCase(updateLandingPageStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchLandingPages, createLandingPage, updateLandingPageStatus };
export default landingPageSlice.reducer;
