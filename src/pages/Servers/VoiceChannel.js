import React, { useEffect, useState } from "react";
import { GetUser } from "../../hooks/redux";
import { useHMSActions } from "@100mslive/react-sdk";
import { useSocket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { setOtherActiveTab } from "../../store/activeTabManagement";

const VoiceChannel = ({ channelName, channelId, roomCode, serverId }) => {
  const [current, setCurrent] = useState([]);
  const user = GetUser();
  const hmsActions = useHMSActions();
  const { getSocket } = useSocket();
  const socket = getSocket();
  const otherActiveTab = useSelector((state) => state?.tab?.otherActiveTab);
  const dispatch = useDispatch();

  const handleJoiningVcUpdate = (data) => {
    setCurrent((prevState) => {
      const updatedState = prevState?.filter(
        (user) => user?._id !== data?.user?._id
      );
      return [...updatedState, data?.user];
    });
  };

  const handleLeavingVcUpdate = (data) => {
    dispatch(setOtherActiveTab(""));
    setCurrent((prevState) => {
      const temp = prevState.filter((user) => user?._id !== data?._id);
      return temp;
    });
  };

  useEffect(() => {
    socket?.on("joining-vc-update", handleJoiningVcUpdate);

    return () => {
      socket?.off("joining-vc-update", handleJoiningVcUpdate);
    };
  }, [current, socket]);

  useEffect(() => {
    socket?.on("leaving-vc-update", handleLeavingVcUpdate);

    return () => {
      socket?.off("leaving-vc-update", handleLeavingVcUpdate);
    };
  }, [current, socket]);

  const joinVoiceChannel = async (roomCode) => {
    try {
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: roomCode,
      });
      await hmsActions.join({ userName: user?.name, authToken });
      await hmsActions.setLocalVideoEnabled(false);
      dispatch(setOtherActiveTab(channelId));

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
        // className="select-none font-medium flex items-center cursor-pointer hover:bg-gray-600 p-1 rounded-md hover:text-white"
        onClick={() => joinVoiceChannel(roomCode)}
        className={`${
          otherActiveTab === channelId ? "text-white bg-gray-600" : ""
        } select-none font-medium flex items-center cursor-pointer hover:bg-gray-600 p-1 rounded-md hover:`}
        style={{ marginTop: 0 }}
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
