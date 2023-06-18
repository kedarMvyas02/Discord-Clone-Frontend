import React, { useEffect, useState } from "react";
import { GetUser } from "../../hooks/redux";
import { useHMSActions } from "@100mslive/react-sdk";
import { useSocket } from "../../socket";
import { useNavigate } from "react-router";

const VoiceChannel = ({ channelName, channelId, roomCode, serverId }) => {
  const [current, setCurrent] = useState([]);
  const user = GetUser();
  const hmsActions = useHMSActions();
  const { getSocket } = useSocket();
  const socket = getSocket();
  const navigate = useNavigate();

  const handleVcUpdate = (data) => {
    setCurrent((prevState) => {
      return [...prevState, data.user];
    });
  };

  useEffect(() => {
    socket?.on("joining-vc-update", handleVcUpdate);

    return () => {
      socket?.off("joining-vc-update", handleVcUpdate);
    };
  }, [current, socket]);

  const joinVoiceChannel = async (roomCode) => {
    try {
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: roomCode,
      });
      await hmsActions.join({ userName: user?.name, authToken });
      console.log("call started successfully");

      socket.emit("user-joined-vc", {
        user,
        server: serverId,
        channel: channelId,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className="select-none font-medium flex items-center cursor-pointer hover:bg-gray-600 p-1 rounded-md hover:text-white"
        style={{ marginTop: 0 }}
        onClick={() => joinVoiceChannel(roomCode)}
      >
        <div className="h-4 mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-5"
          >
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
            <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
          </svg>
        </div>
        {channelName}
        <svg
          onClick={() => navigate(`/channelSettings/${channelId}`)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 opacity-50 ml-auto"
        >
          <path
            fillRule="evenodd"
            d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        {current?.map((data) => (
          <div className="flex p-1 text-sm">
            <img
              src={data?.userImage}
              alt="img"
              className="h-6 w-6 rounded-xlg mx-2 ml-6"
            />
            {`${data?.name}#${data?.uniqueCode}`}
          </div>
        ))}
      </div>
    </>
  );
};

export default VoiceChannel;
