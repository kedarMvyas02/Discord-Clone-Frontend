import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelId: null,
  channelName: null,
  toggleMemberList: false,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
    toggleMemberList: (state) => {
      state.toggleMemberList = !state.toggleMemberList;
    },
  },
});

export default channelSlice.reducer;
export const { setChannelInfo, toggleMemberList } = channelSlice.actions;
export const selectChannelId = (state) => state.channel.channelId;
export const selectChannelName = (state) => state.channel.channelName;
export const selectToggleMemberList = (state) => state.channel.toggleMemberList;
