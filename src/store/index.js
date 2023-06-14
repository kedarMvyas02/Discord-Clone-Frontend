import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import user from "./user";
import channel from "./channel";
import errorModal from "./error";
import dmFriendsReducer from "./dmFriends";
const middleware = getDefaultMiddleware({
  serializableCheck: false, // Disable the default serializableCheck middleware
});

const store = configureStore({
  reducer: {
    user,
    channel,
    errorModal,
    dmFriends: dmFriendsReducer,
  },
  middleware,
});

export default store;
