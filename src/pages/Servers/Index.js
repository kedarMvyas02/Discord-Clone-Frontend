import React, { useState } from "react";
import SideBar from "./SideBar";
import Channels from "./Channels";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import Chat from "../Me/Chat";

const Index = () => {
  const [newId, setNewId] = useState("");
  const { dmId } = useParams();

  const temp = useSelector((state) => state.user);
  if (!temp) return <Navigate to="/login" />;

  const handleNewId = (id) => {
    setNewId(id);
  };

  return (
    <div className="flex h-screen">
      <SideBar onIdChange={handleNewId} />
      {newId || dmId ? <Channels newId={newId || dmId} /> : null}
      <div className="bg-discord-semi600 flex-grow-default">
        <Chat />
      </div>
    </div>
  );
};

export default Index;
