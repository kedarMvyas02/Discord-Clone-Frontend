import { createSlice } from "@reduxjs/toolkit";

const initialTabState = {
  activeTab: "friendChat",
  otherActiveTab: "allFriends",
};

const tabSlice = createSlice({
  name: "tab",
  initialState: initialTabState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setOtherActiveTab: (state, action) => {
      state.otherActiveTab = action.payload;
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export const { setOtherActiveTab } = tabSlice.actions;

export default tabSlice.reducer;
