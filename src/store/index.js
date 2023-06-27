import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import user from "./user";
import channel from "./channel";
import errorModal from "./error";
import dmFriends from "./dmFriends";
import server from "./server";
import tab from "./activeTabManagement";
const middleware = getDefaultMiddleware({
  serializableCheck: false, // Disable the default serializableCheck middleware
});

const store = configureStore({
  reducer: {
    user,
    channel,
    errorModal,
    server,
    dmFriends,
    tab,
  },
  middleware,
});

export default store;
