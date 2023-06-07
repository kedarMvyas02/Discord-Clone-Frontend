import React, { useEffect, useState } from "react";
import VoiceChannel from "../Me/VoiceChannel";
import TextChannel from "../Me/TextChannel";
import client from "../../api/client";
import { getUserDetails } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import ChannelModal from "../Modal/ChannelModal";

const Channels = ({ newId }) => {
  const [toggle, setToggle] = useState({
    channelToggle: true,
    textToggle: true,
    voiceToggle: true,
  });
  const [data, setData] = useState([]);
  const [channelModal, setChannelModal] = useState({
    render: false,
    showModal: false,
    channel: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchServer = async () => {
      const res = await client.get(`/server/getServer/${newId}`);
      if (res?.data?.server) {
        setData(res?.data?.server);
      }
      dispatch(getUserDetails());
    };
    fetchServer();
  }, [newId, dispatch, channelModal.render]);

  const temp = useSelector((state) => state.user);
  const user = temp?.user?.data?.userWithLogin;

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
    }));
  };

  const handleChannelSubmit = async (values) => {
    if (!values.channelName) {
      console.error("Enter a channel name");
      return;
    }

    if (channelModal.channel === "Voice Channel") {
      await client.post(`/server/createVoiceChannel/${data._id}`, {
        name: values.channelName,
      });
    } else if (channelModal.channel === "Text Channel") {
      await client.post(`/server/createTextChannel/${data._id}`, {
        name: values.channelName,
      });
    }

    setChannelModal((prevState) => ({
      ...prevState,
      showModal: false,
      render: !channelModal.render,
    }));
  };

  return (
    <div className="bg-discord-700 flex flex-col " style={{ width: "250px" }}>
      <h2
        onClick={() => {
          setToggle((prevState) => ({
            ...prevState,
            channelToggle: !prevState.channelToggle,
          }));
        }}
        className="select-none flex text-white cursor-pointer font-bold text-sl items-center justify-between border-b border-gray-800 p-3 pt-4 pl-5 hover:bg-gray-600"
      >
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
      <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
      {toggle.channelToggle && (
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
            {toggle.textToggle &&
              data?.textChannels?.map((item, itemIndex) => (
                <React.Fragment key={`${item._id}-${itemIndex}`}>
                  {item && (
                    <TextChannel
                      key={item._id}
                      dmId={item._id}
                      channelName={item.name}
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
              data?.voiceChannels?.map((item, itemIndex) => (
                <React.Fragment key={`${item._id}-${itemIndex}`}>
                  {item && (
                    <VoiceChannel
                      key={item._id}
                      dmId={item._id}
                      channelName={item.name}
                      className="pl-4 list-outside list-none"
                    />
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      )}

      {/* USER SECTION */}
      <div className=" bg-discord-secondPrimary mt-auto p-2 flex justify-between items-center space-x-8 ">
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
          <div className="hover:bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover p-2 rounded-md">
            <svg
              aria-hidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="opacity-50"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z"
                fill="currentColor"
              ></path>
            </svg>
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
          <div className="hover:bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover p-2 rounded-md">
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
      <ChannelModal
        onClose={handleOnClose}
        visible={channelModal.showModal}
        channelName={channelModal.channel}
        submitHandler={handleChannelSubmit}
      />
    </div>
  );
};

export default Channels;
