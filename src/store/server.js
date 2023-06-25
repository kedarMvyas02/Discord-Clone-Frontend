import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../api/client";

const initialState = {
  joinedServers: [],
};

export const getJoinedServers = createAsyncThunk(
  "/server/getJoinedServers",
  async () => {
    const res = await client.get("/server/joinedServers");
    return res?.data?.responseWithChannels?.allServers;
  }
);

const serverSlice = createSlice({
  name: "server",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getJoinedServers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJoinedServers.fulfilled, (state, action) => {
        state.loading = false;
        state.joinedServers = action.payload;
      })
      .addCase(getJoinedServers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default serverSlice.reducer;
