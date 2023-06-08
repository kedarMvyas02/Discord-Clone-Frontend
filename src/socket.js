import io from "socket.io-client";

let socket;

const connectSocket = (user_id, dmId) => {
  socket = io("http://localhost:8000/", {
    query: { user_id, dmId },
  });
};

export { socket, connectSocket };
