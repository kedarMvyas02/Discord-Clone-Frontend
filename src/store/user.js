import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../api/client";

// const initialUser = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

const initialUser = {
  _id: "",
  name: "",
  accessToken: "",
  email: "",
  photoURL: "",
};

export const getUserDetails = createAsyncThunk(
  "/user/getUserDetails",
  async () => {
    const res = await client.get("/users/getUser");
    return res;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logoutSuccess: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { loginSuccess, logoutSuccess } = userSlice.actions;
