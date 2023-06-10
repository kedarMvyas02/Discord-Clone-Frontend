import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelId: null,
  channelName: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export default channelSlice.reducer;
export const { setChannelInfo } = channelSlice.actions;
export const selectChannelId = (state) => state.channel.channelId;
export const selectChannelName = (state) => state.channel.channelName;
