import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import Friends from "./Friends";
import SideBar from "./SideBar";
import FriendChat from "./FriendChat";
import DmChat from "./DmChat";

const IndexDM = () => {
  const { dmId } = useParams();
  const temp = useSelector((state) => state.user);
  if (!temp) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen">
      <SideBar />
      <Friends />
      {!dmId ? (
        <>
          <div className="bg-discord-semi600 flex-grow-default">
            <FriendChat />
          </div>
        </>
      ) : (
        <>
          <div className="bg-discord-semi600 flex-grow-default">
            <DmChat />
          </div>
        </>
      )}
    </div>
  );
};

export default IndexDM;
