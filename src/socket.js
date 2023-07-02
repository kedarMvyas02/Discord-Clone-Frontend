// let socket;
// const connectSocket = (user_id, dmId) => {
//   socket = io("http://localhost:8000/", {
//     query: { user_id, dmId },
//   });
// };
// export { socket, connectSocket };

import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  let socket;

  socket = io("http://127.0.0.1:8000" || process.env.API_URL);
  // socket = io("https://discordclonekedar.onrender.com/");

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  };

  const getSocket = () => {
    return socket;
  };

  return (
    <SocketContext.Provider value={{ disconnectSocket, getSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocket };
