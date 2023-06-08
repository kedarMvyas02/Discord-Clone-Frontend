import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelId: null,
  channelName: null,
  render: false,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
    setRender: (state, action) => {
      state.render = action.payload.render;
    },
  },
});

export default channelSlice.reducer;
export const { setChannelInfo } = channelSlice.actions;
export const { setRender } = channelSlice.actions;
export const selectChannelId = (state) => state.channel.channelId;
export const selectChannelName = (state) => state.channel.channelName;
