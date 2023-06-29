import React, { useState } from "react";
import SideBar from "./SideBar";
import Channels from "./Channels";
import { Navigate, useParams } from "react-router";
import Chat from "./Chat";
import { GetMe } from "../../hooks/redux";
import OnlineUsers from "../../components/OnlineUsers";
import { useDispatch, useSelector } from "react-redux";
import { selectToggleMemberList } from "../../store/channel";
import { setActiveTab } from "../../store/activeTabManagement";

const Index = () => {
  const { serverId } = useParams();
  const [newId, setNewId] = useState(serverId);
  const [members, setMembers] = useState(null);
  const memberList = useSelector(selectToggleMemberList);
  const activeTab = useSelector((state) => state?.tab?.activeTab);
  const dispatch = useDispatch();

  const me = GetMe();
  if (!me) return <Navigate to="/login" />;

  const handleNewId = (id) => {
    setNewId(id);
    dispatch(setActiveTab(id));
  };

  return (
    <div className="flex h-screen">
      <SideBar activeTab={activeTab} onIdChange={handleNewId} />
      <Channels newId={newId} setMembers={setMembers} />
      <div className="bg-discord-semi600 flex-grow-default">
        <Chat />
      </div>
      {memberList && <OnlineUsers allMembers={members} />}
    </div>
  );
};

export default Index;
