import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../store/user";
import { useNavigate } from "react-router";
import client from "../../api/client";
import AddDmModal from "../Modal/AddDmModal";
import ErrorModal from "../Modal/ErrorModal";
import { hideErrorModal, showErrorModal } from "../../store/error";
import { getDmFriends, getUnreadMessages } from "../../store/dmFriends";
import { GetUser } from "../../hooks/redux";
import {
  selectIsConnectedToRoom,
  selectIsSomeoneScreenSharing,
  useAVToggle,
  useHMSActions,
  useHMSStore,
  useScreenShare,
} from "@100mslive/react-sdk";
import { useSocket } from "../../socket";
import SearchBarFriendsModal from "../Modal/SearchBarFriendsModal";
import { setOtherActiveTab } from "../../store/activeTabManagement";

const Friends = ({ otherActiveTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [modal, setModal] = useState(false);
  const [messageArrived, setMessageArrived] = useState(false);
  const { visible, heading, subHeading } = useSelector(
    (state) => state?.errorModal
  );
  const dmFriend = useSelector((state) => state?.dmFriends?.dmFriends);
  const user = GetUser();
  const [searchModal, setSearchModal] = useState(false);
  const hmsActions = useHMSActions();
  const screenshareOn = useHMSStore(selectIsSomeoneScreenSharing);
  const [deafen, setDeafen] = useState(false);
  const { toggleScreenShare } = useScreenShare();
  const { getSocket } = useSocket();
  const socket = getSocket();

  const handleUserOnline = (data) => {
    dispatch(getDmFriends());
    // console.log("data", data);
    // data?.forEach((item) => {
    //   const { userId, status } = item;
    //   if (userId && status) {
    //     setDmFriend((prevState) => {
    //       const updatedDmFriend = prevState?.map((friend) => {
    //         if (friend._id === userId) {
    //           console.log('user update kariyo')
    //           return { ...friend, status: "online" };
    //         }
    //         return friend;
    //       });

    //       console.log("updatedDmFriend online", updatedDmFriend);
    //       return updatedDmFriend;
    //     });
    //   }
    // });
  };

  useEffect(() => {
    socket?.on("user-online", handleUserOnline);

    return () => {
      socket?.off("user-online", handleUserOnline);
    };
  }, [socket]);

  // const handleUserOffline = (data) => {
  //   dispatch(getDmFriends());

  // data?.forEach((item) => {
  //   const { userId, status } = item;
  //   if (userId && status) {
  //     setDmFriend((prevState) => {
  //       const updatedDmFriend = prevState?.map((friend) => {
  //         if (friend._id === userId) {
  //           return { ...friend, status };
  //         }
  //         return friend;
  //       });

  //       console.log("updatedDmFriend offline", updatedDmFriend);
  //       return updatedDmFriend;
  //     });
  //   }
  // });
  // };

  // useEffect(() => {
  //   socket?.on("user-offline", handleUserOffline);

  //   return () => {
  //     socket?.off("user-offline", handleUserOffline);
  //   };
  // }, [socket]);

  useEffect(() => {
    dispatch(getDmFriends());
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleArrivedMessage = () => {
    setMessageArrived(true);
    dispatch(getDmFriends());
  };

  useEffect(() => {
    socket?.on("navoMessage", handleArrivedMessage);

    return () => {
      socket?.off("navoMessage", handleArrivedMessage);
    };
  }, [socket]);

  const friendsNavigateHandler = () => {
    navigate("/channels/@me");
    dispatch(setOtherActiveTab("allFriends"));
  };

  const addToDmClickHandler = () => {
    setModal(true);
  };

  const navigateToDmHandler = async (values) => {
    navigate(`/channels/@me/${values?._id}`);
    dispatch(setOtherActiveTab(values?._id));
    try {
      await client.post(`/server/addToDm/${values._id}`);
      dispatch(getDmFriends());
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  };

  const addToDmHandler = async (values) => {
    try {
      await client.post(`/server/addToDm/${values._id}`);
      dispatch(getDmFriends());
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
    setIsUpdated(!isUpdated);
    setModal(false);
  };

  const removeFromDm = async (id) => {
    try {
      await client.post(`/server/removeFromDm/${id}`);
      dispatch(getDmFriends());
      friendsNavigateHandler();
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
    setIsUpdated(!isUpdated);
  };

  const toggleDeafen = () => {
    setDeafen(!deafen);
    // hmsActions?.setVolume(toggle.deafen ? 0 : 100);
  };

  const openFriendDm = async (dmId) => {
    if (dmId) {
      setMessageArrived(false);
    }
    dispatch(setOtherActiveTab(dmId));
    await client.post(`/server/readMessages/${dmId}`);
    dispatch(getDmFriends());
    navigate(`/channels/@me/${dmId}`);
  };

  const handleOnClose = () => {
    setModal(false);
  };

  const handleCloseSearchModal = () => {
    setSearchModal(!searchModal);
  };

  const settingNavigateHandler = () => {
    navigate("/userSettings");
  };

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
  };

  const openSearchBarModal = () => {
    setSearchModal(!searchModal);
  };

  const handleLeaveVc = () => {
    hmsActions.leave();
    socket.emit("leaving-vc", user);
  };

  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();

  const isConnectedToRoom = useHMSStore(selectIsConnectedToRoom);

  return (
    <div className="flex h-screen">
      <div className="bg-discord-700 flex flex-col" style={{ width: "250px" }}>
        <form className="relative p-3">
          <input
            onClick={openSearchBarModal}
            type="text"
            placeholder="Find or start a conversation"
            className="w-56 h-7 rounded-default bg-gray-900 placeholder-discord-200 placeholder:text-smx p-1 font-normal text-discord-500 focus:outline-none leading-normal text-xs"
          />
          <span>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-discord-200 mr-5 mt-3"
              style={{ top: "6px" }}
              aria-hidden="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
              ></path>
            </svg>
          </span>
        </form>
        <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
        <div
          onClick={friendsNavigateHandler}
          className={`select-none font-medium flex items-center cursor-pointer hover:bg-gray-600 p-2 mt-2 mx-2 rounded-md hover:text-white text-base
          ${
            otherActiveTab === "allFriends"
              ? "text-white bg-gray-600"
              : "text-discord-500"
          }`}
        >
          <div className="mr-1">
            <svg
              className="linkButtonIcon-7rsZcu h-8 w-7 mx-3 ml-2 mr-2"
              aria-hidden="true"
              role="img"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="currentColor"
                  fillRule="nonzero"
                  d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                  transform="translate(2 4)"
                ></path>
                <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
              </g>
            </svg>
          </div>
          Friends
        </div>

        {/* DM PART */}
        <div className="select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-xs">
          <span className="hover:text-discord-500">DIRECT MESSAGES</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            onClick={addToDmClickHandler}
            className="h-6 ml-auto cursor-pointer hover:text-discord-500"
          >
            <path
              fillRule="evenodd"
              d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* FRIENDS LIST */}
        {dmFriend?.map((data) => {
          return (
            <div
              key={data?._id}
              onClick={() => openFriendDm(data?._id)}
              className={`select-none group font-medium flex items-center ${
                messageArrived ? "text-white" : "text-discord-500"
              } ${
                otherActiveTab === data?._id ? "bg-gray-600 text-white" : ""
              } cursor-pointer hover:bg-gray-600 hover:text-white p-2 pl-0 mt-2 mx-2 rounded-full text-base`}
            >
              <img
                src={data?.userImage}
                alt=""
                className="h-8 w-8 mx-3 rounded-full mr-3"
              />
              <span className="absolute">
                {data?.status === "online" ? (
                  <span className="w-[17px] h-[17px] bg-green-500 rounded-full absolute mt-[3px] ml-[30px] border-discord-700  border-[3.5px]"></span>
                ) : (
                  <span className="w-[17px] h-[17px] bg-gray-500 rounded-full absolute mt-[3px] ml-[30px] border-discord-700  border-[3.5px]"></span>
                )}
              </span>

              <span className="mr-1">{data?.name}</span>
              {data?.unreadMessages && data?.unreadMessages > 0 ? (
                <span className="inline-block bg-green-500 text-white text-xm px-2 ml-auto rounded-full">
                  {data?.unreadMessages}
                </span>
              ) : null}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 ml-auto text-discord-500 hover:text-white hidden group-hover:inline"
                onClick={() => removeFromDm(data?._id)}
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
          );
        })}

        {/* Profile Settings */}
        {isConnectedToRoom && (
          <>
            <div className="mt-auto bg-discord-secondPrimary p-2 flex justify-between items-center space-x-8">
              <svg
                className="ping-2IpLcU text-green-600"
                aria-hidden="false"
                role="img"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-label="23 ms"
              >
                <path
                  d="M7.19999 18C7.19999 17.3364 6.77 16.8 6.24019 16.8H3.3598C2.82999 16.8 2.39999 17.3364 2.39999 18V20.4C2.39999 21.0636 2.82999 21.6 3.3598 21.6H6.23923C6.76904 21.6 7.19903 21.0636 7.19903 20.4V18H7.19999Z"
                  fill="currentColor"
                  className="pingForeground-1BRBTc"
                ></path>
                <path
                  d="M14.4 10.6909C14.4 10.0876 13.9699 9.6 13.44 9.6H10.56C10.0301 9.6 9.60001 10.0876 9.60001 10.6909V20.5091C9.60001 21.1124 10.0301 21.6 10.56 21.6H13.44C13.9699 21.6 14.4 21.1124 14.4 20.5091V10.6909Z"
                  fill="currentColor"
                  className="pingForeground-1BRBTc"
                ></path>
                <path
                  d="M21.6 3.46667C21.6 2.8768 21.1699 2.4 20.64 2.4H17.76C17.2301 2.4 16.8 2.8768 16.8 3.46667V20.5333C16.8 21.1232 17.2301 21.6 17.76 21.6H20.64C21.1699 21.6 21.6 21.1232 21.6 20.5333V3.46667Z"
                  fill="currentColor"
                  className="pingForeground-1BRBTc"
                ></path>
              </svg>
              <span className="text-green-500 ml-0 text-base">
                Voice Connected
              </span>
              <div
                onClick={handleLeaveVc}
                className="contents-3NembX hover:bg-discord-iconHover text-gray-400 opacity-50 flex-grow-default rounded-md flex justify-center items-center cursor-pointer"
              >
                <svg
                  aria-hidden="true"
                  role="img"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.1169 1.11603L22.8839 2.88403L19.7679 6.00003L22.8839 9.11603L21.1169 10.884L17.9999 7.76803L14.8839 10.884L13.1169 9.11603L16.2329 6.00003L13.1169 2.88403L14.8839 1.11603L17.9999 4.23203L21.1169 1.11603ZM18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22Z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="border-b-1 border-b-discord-600 bg-discord-secondPrimary flex mt-0">
              <div
                onClick={toggleVideo}
                className={
                  isLocalVideoEnabled
                    ? "bg-discord-100  cursor-pointer p-1 m-1 rounded-md flex-grow-default flex justify-center items-center"
                    : "bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover text-gray-400 hover:text-opacity-50 text-opacity-50 hover:bg-discord-600 p-1 m-1 rounded-md flex-grow-default flex justify-center items-center"
                }
              >
                <svg
                  aria-hidden="true"
                  role="img"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21.526 8.149C21.231 7.966 20.862 7.951 20.553 8.105L18 9.382V7C18 5.897 17.103 5 16 5H4C2.897 5 2 5.897 2 7V17C2 18.104 2.897 19 4 19H16C17.103 19 18 18.104 18 17V14.618L20.553 15.894C20.694 15.965 20.847 16 21 16C21.183 16 21.365 15.949 21.526 15.851C21.82 15.668 22 15.347 22 15V9C22 8.653 21.82 8.332 21.526 8.149Z"
                  ></path>
                </svg>
              </div>

              {/* SCREEN SHARING */}
              <div
                onClick={toggleScreenShare}
                className={
                  screenshareOn
                    ? "bg-discord-100  cursor-pointer p-1 m-1 rounded-md flex-grow-default flex justify-center items-center"
                    : "bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover text-gray-400 hover:text-opacity-50 text-opacity-50 hover:bg-discord-600 p-1 m-1 rounded-md flex-grow-default flex justify-center items-center"
                }
                // className="bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover hover:bg-discord-600 p-1 m-1 rounded-md flex-grow-default flex justify-center items-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 4.5C2 3.397 2.897 2.5 4 2.5H20C21.103 2.5 22 3.397 22 4.5V15.5C22 16.604 21.103 17.5 20 17.5H13V19.5H17V21.5H7V19.5H11V17.5H4C2.897 17.5 2 16.604 2 15.5V4.5ZM13.2 14.3375V11.6C9.864 11.6 7.668 12.6625 6 15C6.672 11.6625 8.532 8.3375 13.2 7.6625V5L18 9.6625L13.2 14.3375Z"
                  ></path>
                </svg>
              </div>
            </div>
          </>
        )}

        {/* USER SECTION */}
        <div
          className=" bg-discord-secondPrimary mt-auto p-2 flex justify-between items-center space-x-8 ml-auto"
          style={{ marginTop: `${isConnectedToRoom ? 0 : "auto"}` }}
        >
          <div className="flex items-center space-x-1">
            <img
              src={user?.userImage}
              loading="lazy"
              alt="userImage"
              className="h-8 w-8 rounded-full"
            />
            <span className="absolute">
              <span className="w-[17px] h-[17px] bg-green-500 rounded-full absolute mt-[3px] ml-[15px] border-discord-700  border-[3.5px]"></span>
            </span>
            <h4 className="text-white text-xs font-medium">
              {user?.name}
              <span className="text-discord-200 block">
                #{user?.uniqueCode}
              </span>
            </h4>
          </div>

          <div className="text-gray-400 flex items-center">
            <div
              onClick={toggleAudio}
              className="hover:bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover p-2 rounded-md"
            >
              {!isLocalAudioEnabled ? (
                <svg
                  aria-hidden="true"
                  role="img"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  className="opacity-50 h-5 mr-1"
                >
                  <path
                    d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z"
                    fill="currentColor"
                  ></path>
                  <path
                    className="text-red-600"
                    d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  role="img"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  className="opacity-50 h-5 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V22H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1Z"
                    fill="currentColor"
                  ></path>
                </svg>
              )}
            </div>
            <div
              onClick={toggleDeafen}
              className="hover:bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover p-2 rounded-md"
            >
              {deafen ? (
                <svg
                  aria-hidden="true"
                  role="img"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="opacity-50 h-5"
                >
                  <path
                    d="M6.16204 15.0065C6.10859 15.0022 6.05455 15 6 15H4V12C4 7.588 7.589 4 12 4C13.4809 4 14.8691 4.40439 16.0599 5.10859L17.5102 3.65835C15.9292 2.61064 14.0346 2 12 2C6.486 2 2 6.485 2 12V19.1685L6.16204 15.0065Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M19.725 9.91686C19.9043 10.5813 20 11.2796 20 12V15H18C16.896 15 16 15.896 16 17V20C16 21.104 16.896 22 18 22H20C21.105 22 22 21.104 22 20V12C22 10.7075 21.7536 9.47149 21.3053 8.33658L19.725 9.91686Z"
                    fill="currentColor"
                  ></path>
                  <path
                    className="text-red-600"
                    d="M3.20101 23.6243L1.7868 22.2101L21.5858 2.41113L23 3.82535L3.20101 23.6243Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="opacity-50 h-5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.00305C6.486 2.00305 2 6.48805 2 12.0031V20.0031C2 21.1071 2.895 22.0031 4 22.0031H6C7.104 22.0031 8 21.1071 8 20.0031V17.0031C8 15.8991 7.104 15.0031 6 15.0031H4V12.0031C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.0031V15.0031H18C16.896 15.0031 16 15.8991 16 17.0031V20.0031C16 21.1071 16.896 22.0031 18 22.0031H20C21.104 22.0031 22 21.1071 22 20.0031V12.0031C22 6.48805 17.514 2.00305 12 2.00305Z"
                    fill="currentColor"
                  ></path>
                </svg>
              )}
            </div>
            <div
              onClick={settingNavigateHandler}
              className="hover:bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover p-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 opacity-50"
              >
                <path
                  fillRule="evenodd"
                  d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ErrorModal
        visible={visible}
        onClose={handleCloseErrorModal}
        heading={heading}
        subHeading={subHeading}
      />
      {modal && (
        <AddDmModal
          onClose={handleOnClose}
          visible={modal}
          submitHandler={addToDmHandler}
        />
      )}
      {searchModal && (
        <SearchBarFriendsModal
          onClose={handleCloseSearchModal}
          visible={searchModal}
          submitHandler={navigateToDmHandler}
        />
      )}
    </div>
  );
};

export default Friends;
