import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ServerModal from "../Modal/ServerModal";
import upload from "../../utils/upload";
import client from "../../api/client";

const SideBar = ({ onIdChange }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [serverModal, setServerModal] = useState({
    render: true,
    showModal: false,
  });

  useEffect(() => {
    const fetchServer = async () => {
      const res = await client.get(`/server/joinedServers`);
      if (res?.data?.responseWithChannels?.allServers) {
        setData(res?.data?.responseWithChannels?.allServers);
      }
    };
    fetchServer();
  }, [serverModal.render]);

  const serverClickHandler = (e, id) => {
    e.preventDefault();
    onIdChange(id);
  };

  const addServerHandler = () => {
    setServerModal((prevState) => ({
      ...prevState,
      showModal: true,
    }));
  };

  const dmHandler = () => {
    // TODO emit join operation here
    navigate("/channels/dm");
  };

  const handleOnClose = () => {
    setServerModal((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  };

  const handleServerSubmit = async (values) => {
    const avatar = await upload(values?.avatarFile);
    await client.post("server/createServer", {
      name: values.serverName,
      avatar,
    });

    setServerModal((prevState) => ({
      ...prevState,
      showModal: false,
      render: !serverModal.render,
    }));
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex flex-col space-y-3 bg-discord-900 p-3"
        style={{ width: "70px" }}
      >
        {/* TODO discord icon hover:rounded-2xl (last option: hover:rounded-xlg)*/}
        {/* TODO sidebar shouldn't collapse when mobile comes */}
        <div
          onClick={dmHandler}
          className="h-12  bg-discord-600 rounded-full flex justify-center items-center cursor-pointer transition-none duration-100 ease-out hover:bg-discord-indigo "
        >
          <img src="https://rb.gy/kuaslg" alt="" className="h-5 " />
        </div>
        <hr className=" border-gray-700 border w-8 mx-auto" />
        {data?.map((item) => (
          <img
            key={item._id}
            src={item?.avatar}
            alt=""
            onClick={(e) => {
              serverClickHandler(e, item._id);
            }}
            className="h-10 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl"
          />
        ))}
        {/* TODO discord plus icon hover:rounded-2xl */}
        <div
          onClick={addServerHandler}
          className="h-12 bg-discord-600 rounded-full flex justify-center items-center cursor-pointer transition-none duration-100 ease-out hover:bg-discord-green group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-discord-green h-6 group-hover:text-white"
          >
            <path
              fillRule="evenodd"
              d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <ServerModal
        onClose={handleOnClose}
        visible={serverModal.showModal}
        submitHandler={handleServerSubmit}
      />
    </div>
  );
};

export default SideBar;
