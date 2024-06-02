import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const initialState = {
  landingPages: [],
  status: "idle",
  error: null,
};

const fetchLandingPages = createAsyncThunk(
  "landingPages/fetchLandingPages",
  async (userId) => {
    const response = await fetch(
      `${API_BASE_URL}/landingPages?userId=${userId}`
    );
    const data = await response.json();
    return data;
  }
);

const createLandingPage = createAsyncThunk(
  "landingPages/createLandingPage",
  async ({ userId, landingPageData }) => {
    const response = await fetch(`${API_BASE_URL}/landingPages`, {
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
    await fetch(`${API_BASE_URL}/landingPages/${landingPageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Live" }),
    });

    const response = await fetch(
      `${API_BASE_URL}/landingPages?userId=${userId}`
    );
    const landingPages = await response.json();

    for (const page of landingPages) {
      if (page.id !== landingPageId) {
        await fetch(`${API_BASE_URL}/landingPages/${page.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Draft" }),
        });
      }
    }

    const updatedResponse = await fetch(
      `${API_BASE_URL}/landingPages?userId=${userId}`
    );
    const updatedData = await updatedResponse.json();
    return updatedData;
  }
);

const editLandingPage = createAsyncThunk(
  "landingPages/editLandingPage",
  async ({ landingPageId, landingPageData }) => {
    const response = await fetch(
      `${API_BASE_URL}/landingPages/${landingPageId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(landingPageData),
      }
    );
    const data = await response.json();
    return data;
  }
);

const deleteLandingPage = createAsyncThunk(
  "landingPages/deleteLandingPage",
  async (landingPageId) => {
    await fetch(`${API_BASE_URL}/landingPages/${landingPageId}`, {
      method: "DELETE",
    });
    return landingPageId;
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
        console.log("fetch", state.landingPages);
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
        state.landingPages = [...state.landingPages, action.payload];
        console.log("create", [...state.landingPages, action.payload]);
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

    builder
      .addCase(editLandingPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editLandingPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.landingPages.findIndex(
          (page) => page.id === action.payload.id
        );
        if (index !== -1) {
          state.landingPages[index] = action.payload;
        }
      })
      .addCase(editLandingPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(deleteLandingPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLandingPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.landingPages = state.landingPages.filter(
          (page) => page.id !== action.payload
        );
      })
      .addCase(deleteLandingPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export {
  fetchLandingPages,
  createLandingPage,
  updateLandingPageStatus,
  editLandingPage,
  deleteLandingPage,
};
export default landingPageSlice.reducer;
