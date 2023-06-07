import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import Friends from "./Friends";
import SideBar from "../Servers/SideBar";
import FriendChat from "./FriendChat";
import DmChat from "./DmChat";

const IndexDM = () => {
  const navigate = useNavigate();
  const { dmId } = useParams();
  const temp = useSelector((state) => state.user);
  if (!temp) return <Navigate to="/login" />;

  const handleNewId = (id) => {
    navigate(`/channels/me/${id}`);
  };

  return (
    <div className="flex h-screen">
      <SideBar onIdChange={handleNewId} />
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
