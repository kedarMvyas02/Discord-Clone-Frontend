// errorModalSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  heading: "",
  subHeading: "",
};

const errorModalSlice = createSlice({
  name: "errorModal",
  initialState,
  reducers: {
    showErrorModal: (state, action) => {
      state.visible = true;
      state.heading = action.payload.heading;
      state.subHeading = action.payload.subHeading;
    },
    hideErrorModal: (state) => {
      state.visible = false;
      state.heading = "";
      state.subHeading = "";
    },
  },
});

export const { showErrorModal, hideErrorModal } = errorModalSlice.actions;

export default errorModalSlice.reducer;
