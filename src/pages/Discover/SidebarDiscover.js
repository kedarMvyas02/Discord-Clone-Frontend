import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ServerModal from "../Modal/ServerModal";
import upload from "../../utils/upload";
import client from "../../api/client";
import { useDispatch, useSelector } from "react-redux";
import { getJoinedServers } from "../../store/server";

const SideBar = () => {
  const navigate = useNavigate();
  const [serverModal, setServerModal] = useState({
    showModal: false,
  });
  const data = useSelector((state) => state?.server?.joinedServers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJoinedServers());
  }, []);

  const serverClickHandler = (e, id) => {
    e.preventDefault();
    navigate(`/channels/${id}`);
  };

  const addServerHandler = () => {
    setServerModal((prevState) => ({
      ...prevState,
      showModal: true,
    }));
  };

  const handleOnClose = () => {
    setServerModal((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  };

  const handleServerSubmit = async (values) => {
    try {
      const avatar = await upload(values?.avatarFile);
      await client.post("server/createServer", {
        name: values.serverName,
        avatar,
        privacy: values.privacy,
        description: values.description,
        serverType: values.serverType,
      });
    } catch (error) {
      console.log(error);
    }

    setServerModal((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  };

  const navigateToDm = () => {
    navigate("/channels/@me");
  };

  const navigateToDiscover = () => {
    navigate("/discover");
  };

  return (
    <div className="flex h-screen sticky top-0">
      <div
        className="flex flex-col space-y-3 bg-discord-900 p-3"
        style={{ width: "70px" }}
      >
        <div
          onClick={navigateToDm}
          tabIndex="0"
          className="h-12  bg-discord-600 rounded-full flex justify-center items-center cursor-pointer transition-none duration-100 ease-out hover:bg-discord-indigo focus:bg-discord-indigo focus:rounded-2xlg focus:text-white hover:rounded-2xlg"
        >
          <img src="https://rb.gy/kuaslg" alt="" className="h-5 " />
        </div>
        <hr className=" border-gray-700 border w-8 mx-auto" />
        {data?.map((item) => (
          <img
            key={item?._id}
            src={item?.avatar}
            alt=""
            onClick={(e) => {
              serverClickHandler(e, item?._id);
            }}
            className="h-10 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xlg"
          />
        ))}
        <div
          tabIndex="0"
          onClick={addServerHandler}
          className="h-12 bg-discord-600 rounded-full hover:rounded-2xlg flex justify-center items-center cursor-pointer transition-none duration-100 ease-out hover:bg-discord-green focus:rounded-2xlg group"
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
        <div
          onClick={navigateToDiscover}
          tabIndex="0"
          className="h-12 bg-discord-600 rounded-full hover:rounded-2xlg focus:bg-discord-green focus:text-white focus:rounded-2xlg flex justify-center items-center cursor-pointer transition-none duration-100 ease-out hover:bg-discord-green group"
        >
          <svg
            aria-hidden="true"
            role="img"
            className="text-discord-green h-6 group-hover:text-white group-focus:text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"
            ></path>
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
