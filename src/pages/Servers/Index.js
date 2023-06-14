import React, { useState } from "react";
import SideBar from "./SideBar";
import Channels from "./Channels";
import { Navigate, useParams } from "react-router";
import Chat from "./Chat";
import { GetMe } from "../../hooks/redux";

const Index = () => {
  const { serverId } = useParams();
  const [newId, setNewId] = useState(serverId);

  const me = GetMe();
  if (!me) return <Navigate to="/login" />;

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
