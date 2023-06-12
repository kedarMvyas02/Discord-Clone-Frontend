import React, { useState } from "react";
import SideBar from "./SideBar";
import Channels from "./Channels";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import Chat from "./Chat";

const Index = () => {
  const { serverId } = useParams();
  const [newId, setNewId] = useState(serverId);

  const temp = useSelector((state) => state?.user);
  if (!temp) return <Navigate to="/login" />;

  const handleNewId = (id) => {
    setNewId(id);
  };

  return (
    <div className="flex h-screen">
      <SideBar onIdChange={handleNewId} />
      <Channels newId={newId} />
      <div className="bg-discord-semi600 flex-grow-default">
        <Chat />
      </div>
    </div>
  );
};

export default Index;
