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
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../store/activeTabManagement";

const IndexDM = () => {
  const screenshareOn = useHMSStore(selectIsSomeoneScreenSharing);
  useEffect(() => {}, [screenshareOn]);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [data, setData] = useState(null);
  const activeTab = useSelector((state) => state?.tab?.activeTab);
  const otherActiveTab = useSelector((state) => state?.tab?.otherActiveTab);
  const dispatch = useDispatch();

  const { dmId } = useParams();
  const me = GetMe();

  useEffect(() => {
    dispatch(setActiveTab("friendChat"));
  }, [dispatch]);

  if (!me) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen">
      <SideBar activeTab={activeTab} />
      <Friends otherActiveTab={otherActiveTab} />
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
