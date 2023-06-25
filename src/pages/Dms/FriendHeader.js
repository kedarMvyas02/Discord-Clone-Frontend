import React, { useEffect, useState } from "react";
import FriendReqModal from "../Modal/FriendReqModal";
import client from "../../api/client";
import { useSelector, useDispatch } from "react-redux";
import { hideErrorModal, showErrorModal } from "../../store/error";
import ErrorModal from "../Modal/ErrorModal";
import { getPendingRequests } from "../../store/dmFriends";
import { useSocket } from "../../socket";
import { GetUser } from "../../hooks/redux/index";

const FriendHeader = ({ setClickedOn, clickedOn }) => {
  const [modal, setModal] = useState(false);
  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );
  const dispatch = useDispatch();
  const [highlight, setHighlight] = useState(false);
  const { getSocket } = useSocket();
  const socket = getSocket();
  const user = GetUser();

  const blinkArrivedReq = () => {
    setHighlight(true);
  };

  useEffect(() => {
    socket?.on("friendReqCame", blinkArrivedReq);

    return () => {
      socket?.off("friendReqCame", blinkArrivedReq);
    };
  }, [socket]);

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
  };

  const addFriendClickHandler = () => {
    setModal(true);
  };

  const addFriendHandler = async (values) => {
    try {
      const res = await client.post("/users/sendFriendRequest", {
        uniqueCode: values?.uniqueCode,
      });
      socket.emit("friendReqArrived", {
        from: user?._id,
        to: values?.uniqueCode,
      });
      dispatch(getPendingRequests());
      const heading = `Success`;
      const subHeading = `${res.data.msg}`;
      dispatch(showErrorModal({ heading, subHeading }));
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
    setModal(false);
  };

  const handleOnClose = () => {
    setModal(false);
    handleCloseErrorModal();
  };

  const pendingHandler = async () => {
    setClickedOn("pending");
  };

  const allFriendsHandler = async () => {
    setClickedOn("all");
  };

  const arrivedHandler = async () => {
    setHighlight(false);
    setClickedOn("arrived");
  };

  return (
    <div className="flex-1 flex items-center justify-between bg-discord-600 border-b  px-4 py-3 border-b border-discord-900">
      <div className="flex items-center">
        <div className="text-discord-200 text-2xl">
          <svg
            className="linkButtonIcon-7rsZcu h-6 w-7 mr-1"
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
        <div className="ml-2 text-m text-white font-semibold">Friends</div>
        {/* VERTICAL LINE */}
        <div className="h-full flex items-center">
          <div className="w-px h-6 bg-discord-200 mx-4"></div>
        </div>

        <div className="flex ">
          <div
            onClick={allFriendsHandler}
            className="text-discord-100 cursor-pointer opacity-75  font-medium  "
          >
            <span
              tabIndex="0"
              className={`px-2 py-1 select-none hover:bg-discord-200 focus:bg-discord-200 focus:text-white focus:bg-opacity-50 rounded-mdx hover:bg-opacity-25 ${
                clickedOn === "all"
                  ? "bg-discord-200 text-white bg-opacity-50"
                  : null
              }`}
            >
              All Friends
            </span>
          </div>
          <div
            onClick={pendingHandler}
            className="text-discord-100 cursor-pointer opacity-75  font-medium  "
          >
            <span
              tabIndex="0"
              className={`px-2 py-1 select-none hover:bg-discord-200 focus:bg-discord-200 focus:text-white focus:bg-opacity-50 rounded-mdx hover:bg-opacity-25 ${
                clickedOn === "pending"
                  ? "bg-discord-200 text-white bg-opacity-50"
                  : null
              }`}
            >
              Pending
            </span>
          </div>
          <div
            onClick={arrivedHandler}
            className="text-discord-100 cursor-pointer opacity-75  font-medium  "
          >
            <span
              tabIndex="0"
              className={`px-2 py-1 select-none hover:bg-discord-200 focus:bg-discord-200 focus:text-white focus:bg-opacity-50 rounded-mdx hover:bg-opacity-25 ${
                clickedOn === "arrived"
                  ? "bg-discord-200 text-white bg-opacity-50"
                  : null
              }`}
            >
              {highlight && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
              Arrived
            </span>
          </div>
          <div
            onClick={addFriendClickHandler}
            className="text-white cursor-pointer opacity-75 px-2  font-medium  "
          >
            <span className="py-1 px-2 md:invisible sm:invisible lg:visible select-none  bg-green-700 rounded-mdx ">
              Add Friend
            </span>
          </div>
        </div>
      </div>
      <div className="sm:hidden lg:flex md:hidden static mr-0 ">
        <a
          href="https://support.discord.com/hc/en-us"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer ml-3"
        >
          <svg
            className="w-6 h-6 text-discord-topIcons hover:text-gray-200"
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"
            ></path>
          </svg>
        </a>
      </div>
      <ErrorModal
        visible={visible}
        onClose={handleCloseErrorModal}
        heading={heading}
        subHeading={subHeading}
      />
      <FriendReqModal
        onClose={handleOnClose}
        visible={modal}
        submitHandler={addFriendHandler}
      />
    </div>
  );
};

export default FriendHeader;
