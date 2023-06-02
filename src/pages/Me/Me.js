import React, { useEffect, useState } from "react";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Channel from "./Channel";
import client from "../../api/client";
import ChannelModal from "../Modal/ChannelModal";
import ServerModal from "../Modal/ServerModal";

const Me = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState({
    textToggle: true,
    voiceToggle: true,
    channelToggle: true,
  });
  const [index, setIndex] = useState(null);
  const [channelModal, setChannelModal] = useState({
    render: false,
    showModal: false,
    channel: null,
  });
  const [serverModal, setServerModal] = useState({
    render: true,
    showModal: false,
  });

  useEffect(() => {
    const fetchServer = async () => {
      const res = await client.get(`/server/joinedServers`);
      setData(res.data.responseWithChannels.allServers);
    };
    fetchServer();
  }, [channelModal.render, serverModal.render]);

  const handleOnClose = () => {
    setChannelModal((prevState) => ({
      ...prevState,
      showModal: false,
    }));
    setServerModal((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  };

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

  const handleChannelSubmit = async (values) => {
    if (!values.channelName) {
      console.error("Enter a channel name");
      return;
    }

    if (channelModal.channel === "Voice Channel") {
      await client.post(`/server/createVoiceChannel/${data[index]._id}`, {
        name: values.channelName,
      });
    } else if (channelModal.channel === "Text Channel") {
      await client.post(`/server/createTextChannel/${data[index]._id}`, {
        name: values.channelName,
      });
    }

    setChannelModal((prevState) => ({
      ...prevState,
      showModal: false,
      render: !channelModal.render,
    }));
  };

  const handleServerSubmit = async (values) => {
    console.log(values);
    await client.post(
      "server/createServer",
      {
        name: values.serverName,
        avatar: values.avatarFile,
      },
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );

    setServerModal((prevState) => ({
      ...prevState,
      showModal: false,
      render: !serverModal.render,
    }));
  };

  const serverClickHandler = (event, index) => {
    setIndex(index);
  };

  const addServerHandler = () => {
    setServerModal((prevState) => ({
      ...prevState,
      showModal: true,
    }));
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex flex-col space-y-3 bg-discord-900 p-3"
        style={{ width: "70px" }}
      >
        {/* TODO discord icon hover:rounded-2xl */}
        <div className="h-12 bg-discord-600 rounded-full flex justify-center items-center cursor-pointer transition-none duration-100 ease-out hover:bg-discord-indigo ">
          <img src="https://rb.gy/kuaslg" alt="" className="h-5" />
        </div>
        <hr className=" border-gray-700 border w-8 mx-auto" />
        {data.map((item, index) => (
          <img
            key={index}
            src={item.avatar}
            alt=""
            onClick={(event) => {
              serverClickHandler(event, index);
            }}
            className="h-10 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl"
          />
        ))}
        {/* TODO discord plus icon hover:rounded-2xl */}
        <div
          onClick={addServerHandler}
          className="h-12 bg-discord-600 rounded-full flex justify-center items-center cursor-pointer transition-none duration-100 ease-out hover:bg-discord-green group"
        >
          <PlusIcon className="text-discord-green h-5 group-hover:text-white" />
        </div>
      </div>
      <div className="bg-discord-700 flex flex-col " style={{ width: "250px" }}>
        <h2
          onClick={() => {
            setToggle((prevState) => ({
              ...prevState,
              channelToggle: !prevState.channelToggle,
            }));
          }}
          className="flex text-white cursor-pointer font-bold text-sl items-center justify-between border-b border-gray-800 p-3 pt-4 pl-5 hover:bg-gray-600"
        >
          {data[index]?.name}
          <ChevronDownIcon className="h-5 ml-2 " />
        </h2>
        <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
        {toggle.channelToggle && (
          <div className="text-discord-200 flex-grow overflow-y-scroll scrollbar-hide">
            <div className="flex items-center p-2 pb-0 mb-0">
              <ChevronDownIcon className="h-3 mr-1   " />
              <h4
                className="fonts-semibold cursor-pointer hover:text-white text-xs pb-0"
                onClick={() => {
                  setToggle((prevState) => ({
                    ...prevState,
                    textToggle: !prevState.textToggle,
                  }));
                }}
              >
                TEXT CHANNELS
              </h4>
              <PlusIcon
                className="h-5 ml-auto cursor-pointer hover:text-white"
                onClick={handleAddTextChannel}
              />
            </div>
            <div className="flex flex-col space-y-2 px-2 mb-4">
              {toggle.textToggle &&
                data[index]?.textChannels?.map((item, itemIndex) => (
                  <React.Fragment key={`${item._id}-${itemIndex}`}>
                    {item && (
                      <Channel
                        key={item._id}
                        channelName={item.name}
                        className="pl-4 list-outside list-none"
                      />
                    )}
                  </React.Fragment>
                ))}
            </div>
            <div className="flex items-center p-2 pb-0 mb-0">
              <ChevronDownIcon className="h-3 mr-1   " />
              <h4
                className="fonts-semibold cursor-pointer hover:text-white text-xs pb-0"
                onClick={() => {
                  setToggle((prevState) => ({
                    ...prevState,
                    voiceToggle: !prevState.voiceToggle,
                  }));
                }}
              >
                VOICE CHANNELS
              </h4>
              <PlusIcon
                className="h-5 ml-auto cursor-pointer hover:text-white"
                onClick={handleAddVoiceChannel}
              />
            </div>
            <div className="flex flex-col space-y-2 px-2 mb-4">
              {toggle.voiceToggle &&
                data[index]?.voiceChannels?.map((item, itemIndex) => (
                  <React.Fragment key={`${item._id}-${itemIndex}`}>
                    {item && (
                      <Channel
                        key={item._id}
                        channelName={item.name}
                        className="pl-4 list-outside list-none"
                      />
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
        )}
      </div>

      <ChannelModal
        onClose={handleOnClose}
        visible={channelModal.showModal}
        channelName={channelModal.channel}
        submitHandler={handleChannelSubmit}
      />
      <ServerModal
        onClose={handleOnClose}
        visible={serverModal.showModal}
        submitHandler={handleServerSubmit}
      />
    </div>
  );
};

export default Me;
// 02:49:00 hrs on https://www.youtube.com/watch?v=MtT5Xuf9_xU&list=LL&index=1&t=13979s
