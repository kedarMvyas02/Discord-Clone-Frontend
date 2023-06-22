import React, { useEffect, useState } from "react";
import VoiceChannel from "./VoiceChannel";
import TextChannel from "./TextChannel";
import client from "../../api/client";
import { getUserDetails } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import ChannelModal from "../Modal/ChannelModal";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import AddFriendsToServer from "../Modal/AddFriendsToServerModal";
import { GetUser } from "../../hooks/redux";
import ErrorModal from "../Modal/ErrorModal";
import { hideErrorModal, showErrorModal } from "../../store/error";
import { useNavigate, useParams } from "react-router";
import {
  selectIsConnectedToRoom,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useSocket } from "../../socket";

const Channels = ({ newId, setMembers }) => {
  const [toggle, setToggle] = useState({
    textToggle: true,
    voiceToggle: true,
  });
  const [data, setData] = useState([]);
  const [channelModal, setChannelModal] = useState({
    render: false,
    showModal: false,
    channel: null,
    modal: false,
    addServerModal: false,
  });
  const dispatch = useDispatch();
  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );
  const { serverId } = useParams();
  const user = GetUser();
  const navigate = useNavigate();
  const { isLocalAudioEnabled, toggleAudio, toggleVideo } = useAVToggle();
  const isConnectedToRoom = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const { getSocket } = useSocket();
  const socket = getSocket();

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const res = await client.get(`/server/getServer/${newId}`);
        if (res?.data?.server) {
          setData(res?.data?.server);
          setMembers(res?.data?.server?.members);
        }
        dispatch(getUserDetails());
      } catch (error) {
        console.log(error);
      }
    };
    fetchServer();
  }, [newId, dispatch, channelModal.render]);

  const handleAddTextChannel = async () => {
    setChannelModal((prevState) => ({
      ...prevState,
      showModal: true,
      channel: "Text Channel",
    }));
  };

  const handleAddVoiceChannel = async () => {
    setChannelModal((prevState) => ({
      ...prevState,
      showModal: true,
      channel: "Voice Channel",
    }));
  };

  const handleOnClose = () => {
    setChannelModal((prevState) => ({
      ...prevState,
      showModal: false,
      addServerModal: false,
    }));
  };

  const handleChannelSubmit = async (values) => {
    if (!values.channelName) {
      console.error("Enter a channel name");
      return;
    }

    try {
      if (channelModal.channel === "Voice Channel") {
        await client.post(`/server/createVoiceChannel/${data._id}`, {
          name: values.channelName,
        });
      } else if (channelModal.channel === "Text Channel") {
        await client.post(`/server/createTextChannel/${data._id}`, {
          name: values.channelName,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setChannelModal((prevState) => ({
      ...prevState,
      showModal: false,
      render: !channelModal.render,
    }));
  };

  const settingNavigateHandler = () => {
    navigate("/userSettings");
  };

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
  };

  const menuServerSettings = () => {
    navigate(`/serverSettings/${serverId}`);
  };

  const menuDeleteServer = async () => {
    try {
      await client.post(`/server/deleteServer/${serverId}`);
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  };

  const menuLeaveServer = async () => {
    try {
      await client.post(`/server/leave/${serverId}`, {
        uniqueCode: user?.uniqueCode,
      });
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
    navigate("/channels/@me");
  };

  const menuInvitePeople = () => {
    setChannelModal((prevState) => {
      return {
        ...prevState,
        addServerModal: true,
      };
    });
  };

  const addToServerHandler = async (data) => {
    try {
      await client.post(`/server/join/${serverId}`, {
        uniqueCode: data?.uniqueCode,
      });
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
    setChannelModal((prevState) => {
      return {
        ...prevState,
        addServerModal: false,
      };
    });
  };

  const handleLeaveVc = () => {
    hmsActions.leave();
    socket.emit("leaving-vc", user);
  };

  return (
    <div className="bg-discord-700 flex flex-col" style={{ width: "250px" }}>
      <Menu
        menuButton={
          <MenuButton>
            <h2 className=" select-none flex text-white cursor-pointer font-bold text-sm  items-center justify-between border-b border-gray-800 p-3 pt-4 pl-5 hover:bg-gray-600">
              {data?.name}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 ml-2"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </h2>
          </MenuButton>
        }
      >
        <div className="p-4 pt-0" style={{ width: "250px" }}>
          <MenuItem
            onClick={menuInvitePeople}
            className="bg-discord-floating text-discord-500 hover:bg-discord-experiment500 hover:rounded-lg hover:text-white cursor-pointer pl-4 pr-4 flex h-12 object-contain items-center"
          >
            Invite People{" "}
            <svg
              // className="icon-3XHs8t"
              aria-hidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="inline-block ml-auto"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"
              ></path>
            </svg>
          </MenuItem>
          {user?._id === data?.owner && (
            <MenuItem
              onClick={menuServerSettings}
              className="bg-discord-floating text-discord-500 flex h-12 object-contain items-center hover:bg-discord-experiment500 hover:rounded-lg hover:text-white cursor-pointer pl-4 pr-4"
            >
              Server Settings{" "}
              <svg
                className="icon-3XHs8t ml-auto"
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
                  d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                ></path>
              </svg>
            </MenuItem>
          )}
          <MenuItem
            onClick={handleAddTextChannel}
            className="bg-discord-floating text-discord-500 flex h-12 object-contain items-center hover:bg-discord-experiment500 hover:rounded-lg hover:text-white cursor-pointer pl-4 pr-4"
          >
            Create Text Channel{" "}
            <svg
              className="icon-3XHs8t ml-auto"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
              ></path>
            </svg>
          </MenuItem>
          <MenuItem
            onClick={handleAddVoiceChannel}
            className="bg-discord-floating text-discord-500 flex h-12 object-contain items-center hover:bg-discord-experiment500 hover:rounded-lg hover:text-white cursor-pointer pl-4 pr-4"
          >
            Create Voice Channel{" "}
            <svg
              className="icon-3XHs8t ml-auto"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
              ></path>
            </svg>
          </MenuItem>
          {user?._id === data?.owner ? (
            <MenuItem
              onClick={menuDeleteServer}
              className="bg-discord-floating text-red-600 flex h-12 object-contain items-center hover:bg-red-600 hover:rounded-lg hover:text-white hover:text-md cursor-pointer pl-4 pr-4"
            >
              Delete Server{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 ml-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </MenuItem>
          ) : (
            <MenuItem
              onClick={menuLeaveServer}
              className="bg-discord-floating text-red-600 flex h-12 object-contain items-center hover:bg-red-600 hover:rounded-lg hover:text-white hover:text-md cursor-pointer pl-4 pr-4"
            >
              Leave Server
              <svg
                className="icon-3XHs8t ml-auto"
                aria-hidden="true"
                role="img"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"
                ></path>
              </svg>
            </MenuItem>
          )}
        </div>
      </Menu>
      <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />

      <div className=" text-discord-sideBarChannels flex-grow overflow-y-scroll scrollbar-hide">
        <div className="flex items-center p-2 pb-0 mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3 w-3 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
          <h4
            className="fonts-semibold cursor-pointer hover:text-white text-xs pb-0 select-none"
            onClick={() => {
              setToggle((prevState) => ({
                ...prevState,
                textToggle: !prevState.textToggle,
              }));
            }}
          >
            TEXT CHANNELS
          </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            onClick={handleAddTextChannel}
            className="h-6 ml-auto cursor-pointer hover:text-white"
          >
            <path
              fillRule="evenodd"
              d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex flex-col space-y-2 px-2 mb-4">
          {toggle?.textToggle &&
            data?.textChannels?.map((item, itemIndex) => (
              <React.Fragment key={`${item?._id}-${itemIndex}`}>
                {item && (
                  <TextChannel
                    serverId={data?._id}
                    key={item?._id}
                    channelId={item?._id}
                    channelName={item?.name}
                    className="pl-4 list-outside list-none"
                  />
                )}
              </React.Fragment>
            ))}
        </div>
        <div className="flex items-center p-2 pb-0 mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3 w-3 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
          <h4
            className="fonts-semibold cursor-pointer hover:text-white text-xs pb-0 select-none"
            onClick={() => {
              setToggle((prevState) => ({
                ...prevState,
                voiceToggle: !prevState.voiceToggle,
              }));
            }}
          >
            VOICE CHANNELS
          </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            onClick={handleAddVoiceChannel}
            className="h-6 ml-auto cursor-pointer hover:text-white"
          >
            <path
              fillRule="evenodd"
              d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex flex-col space-y-2 px-2 mb-4">
          {toggle.voiceToggle &&
            data?.voiceChannels?.map((item) => (
              <React.Fragment key={item._id}>
                {item && (
                  <VoiceChannel
                    roomCode={item?.roomCode}
                    serverId={data?._id}
                    channelId={item._id}
                    channelName={item.name}
                    className="pl-4 list-outside list-none"
                  />
                )}
              </React.Fragment>
            ))}
        </div>
      </div>

      {/* PROFILE SETTINGS */}
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
              className="bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover hover:bg-discord-600 p-1 m-1 rounded-md flex-grow-default flex justify-center items-center"
            >
              <svg
                className="buttonIcon-2Zsrs2 text-gray-400 opacity-50"
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
            <div className="bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover hover:bg-discord-600 p-1 m-1 rounded-md flex-grow-default flex justify-center items-center">
              <svg
                className="buttonIcon-2Zsrs2 text-gray-400 opacity-50"
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
            className="h-8 rounded-full"
          />
          <h4 className="text-white text-xs font-medium">
            {user?.name}
            <span className="text-discord-200 block">#{user?.uniqueCode}</span>
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
                  clip-rule="evenodd"
                  d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V22H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1Z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
          </div>
          <div className="hover:bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover p-2 rounded-md">
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
      <ErrorModal
        visible={visible}
        onClose={handleCloseErrorModal}
        heading={heading}
        subHeading={subHeading}
      />
      <ChannelModal
        onClose={handleOnClose}
        visible={channelModal.showModal}
        channelName={channelModal.channel}
        submitHandler={handleChannelSubmit}
      />
      {channelModal.addServerModal && (
        <AddFriendsToServer
          onClose={handleOnClose}
          visible={channelModal.addServerModal}
          submitHandler={addToServerHandler}
        />
      )}
    </div>
  );
};

export default Channels;
