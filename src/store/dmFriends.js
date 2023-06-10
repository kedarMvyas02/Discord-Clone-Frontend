//
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../api/client";

// const initialUser = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

const initialState = {
  dmFriends: [],
  allFriends: [],
  loading: false,
  error: null,
};

export const getDmFriends = createAsyncThunk(
  "/dmFriends/getDmFriends",
  async () => {
    const res = await client.get("/server/getDmFriends");
    return res?.data?.dmFriends;
  }
);

export const getAllFriends = createAsyncThunk(
  "/dmFriends/getAllFriends",
  async () => {
    const res = await client.get("/users/getFriends/");
    return res?.data?.allFriends;
  }
);

const dmFriendsSlice = createSlice({
  name: "dmFriends",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDmFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDmFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.dmFriends = action.payload;
      })
      .addCase(getDmFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.allFriends = action.payload;
      })
      .addCase(getAllFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dmFriendsSlice.reducer;
// export const { loginoutSuccess } = dmFriendsSlice.actions;
