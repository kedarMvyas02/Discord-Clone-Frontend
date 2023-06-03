import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import user from "./user";
import channel from "./channel";

const middleware = getDefaultMiddleware({
  serializableCheck: false, // Disable the default serializableCheck middleware
});

const store = configureStore({
  reducer: {
    user,
    channel,
  },
  middleware,
});

export default store;
