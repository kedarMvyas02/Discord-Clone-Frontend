import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../api/client";

const initialState = {
  joinedServers: [],
  serverData: [],
  loading: false,
  error: "",
};

export const getJoinedServers = createAsyncThunk(
  "/server/getJoinedServers",
  async () => {
    const res = await client.get("/server/joinedServers");
    return res?.data?.responseWithChannels?.allServers;
  }
);

export const getServer = createAsyncThunk(
  "/server/getServer",
  async (newId) => {
    const res = await client.get(`/server/getServer/${newId}`);
    return res?.data?.server;
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
      })
      .addCase(getServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServer.fulfilled, (state, action) => {
        state.loading = false;
        state.serverData = action.payload;
      })
      .addCase(getServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default serverSlice.reducer;
