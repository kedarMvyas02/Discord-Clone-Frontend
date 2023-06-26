import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import Friends from "./Friends";
import SideBar from "./SideBar";
import FriendChat from "./FriendChat";
import DmChat from "./DmChat";
import { GetMe } from "../../hooks/redux";
import {
  selectIsSomeoneScreenSharing,
  useHMSStore,
} from "@100mslive/react-sdk";
import UserProfileSide from "./userProfileSide";

const IndexDM = () => {
  const screenshareOn = useHMSStore(selectIsSomeoneScreenSharing);
  useEffect(() => {}, [screenshareOn]);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [data, setData] = useState(null);

  const { dmId } = useParams();
  const me = GetMe();
  if (!me) return <Navigate to="/login" />;

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
            <DmChat
              data={data}
              setData={setData}
              openUserProfile={openUserProfile}
              setOpenUserProfile={setOpenUserProfile}
            />
          </div>
          {openUserProfile && <UserProfileSide user={data} />}
        </>
      )}
    </div>
  );
};

export default IndexDM;
