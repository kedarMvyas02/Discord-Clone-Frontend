//
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../api/client";

const initialState = {
  dmFriends: [],
  allFriends: [],
  pendingFriendRequests: [],
  arrivedFriendRequests: [],
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
    try {
      const res = await client.get("/users/getFriends/");
      return res?.data?.allFriends;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPendingRequests = createAsyncThunk(
  "/dmFriends/getPendingRequests",
  async () => {
    const res = await client.get("/users/getPendingRequests/");
    return res?.data?.pendingReq;
  }
);

export const getArrivedFriendRequests = createAsyncThunk(
  "/dmFriends/getArrivedFriendRequests",
  async () => {
    const res = await client.get("/users/getArrivedFriendRequests/");
    return res?.data?.arrivedReq;
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
      // all friends
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
      })
      // pending requests
      .addCase(getPendingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingFriendRequests = action.payload;
      })
      .addCase(getPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // arrived requests
      .addCase(getArrivedFriendRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArrivedFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.arrivedFriendRequests = action.payload;
      })
      .addCase(getArrivedFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dmFriendsSlice.reducer;
