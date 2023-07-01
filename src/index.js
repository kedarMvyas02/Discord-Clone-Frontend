import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { SocketProvider } from "./socket";
import { HMSRoomProvider } from "@100mslive/react-sdk";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HMSRoomProvider>
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    </HMSRoomProvider>
  </React.StrictMode>
);
