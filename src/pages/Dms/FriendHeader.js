import React, { useEffect, useState } from "react";
import FriendReqModal from "../Modal/FriendReqModal";
import client from "../../api/client";
import { useSelector, useDispatch } from "react-redux";
import { hideErrorModal, showErrorModal } from "../../store/error";
import ErrorModal from "../Modal/ErrorModal";
import { getAllFriends } from "../../store/dmFriends";
import { useSocket } from "../../socket";
import { GetUser } from "../../hooks/redux/index";

const FriendHeader = ({ setCurrentBody }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );
  const allFriends = useSelector((state) => state.dmFriends);
  const dispatch = useDispatch();
  const [highlight, setHighlight] = useState(false);
  const { getSocket } = useSocket();
  const socket = getSocket();
  const user = GetUser();

  useEffect(() => {
    dispatch(getAllFriends());
    setCurrentBody(allFriends);
    setData(allFriends);
    if (data) {
      setCurrentBody(data);
      setData(data);
    }
  }, [dispatch]);

  const blinkArrivedReq = () => {
    setHighlight(true);
  };

  useEffect(() => {
    socket?.on("friendReqCame", blinkArrivedReq);

    return () => {
      socket?.off("friendReqCame", blinkArrivedReq);
    };
  }, [socket]);

  const fetchPendingData = async () => {
    try {
      const res = await client.get("/users/getPendingRequests");
      setData(res?.data);
      setCurrentBody(res?.data);
    } catch (error) {
      setData(error?.response?.data);
      setCurrentBody(error?.response?.data);
    }
  };

  const fetchArrivedReq = async () => {
    try {
      const res = await client.get("/users/getArrivedFriendRequests");
      setData(res?.data);
      setCurrentBody(res?.data);
    } catch (error) {
      setData(error?.response?.data);
      setCurrentBody(error?.response?.data);
    }
  };

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
      dispatch(getAllFriends());
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
    await fetchPendingData();
    setCurrentBody(data);
  };

  const allFriendsHandler = async () => {
    dispatch(getAllFriends());
    setCurrentBody(allFriends);
    setData(allFriends);
    // setCurrentBody(data);
  };

  const arrivedHandler = async () => {
    setHighlight(false);
    await fetchArrivedReq();
    setCurrentBody(data);
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
              className="px-2 py-1 select-none hover:bg-discord-200 focus:bg-discord-200 focus:text-white focus:bg-opacity-50 rounded-mdx hover:bg-opacity-25"
            >
              All
            </span>
          </div>
          <div
            onClick={pendingHandler}
            className="text-discord-100 cursor-pointer opacity-75  font-medium  "
          >
            <span
              tabIndex="0"
              className="px-2 py-1 select-none hover:bg-discord-200 focus:bg-discord-200 focus:text-white focus:bg-opacity-50 rounded-mdx hover:bg-opacity-25"
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
              className="px-2 py-1 select-none hover:bg-discord-200 focus:bg-discord-200 focus:text-white focus:bg-opacity-50 rounded-mdx hover:bg-opacity-25 relative"
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

        {/* ok<hr className="border-y-discord-transparentBlack1 border w-full mx-auto" /> */}
      </div>
      <div className="sm:hidden lg:flex md:hidden static mr-0 ">
        {/* <div className="ml-3">
          <svg
            className="w-6 h-6 text-discord-topIcons hover:text-gray-200"
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 9V14C18 15.657 19.344 17 21 17V18H3V17C4.656 17 6 15.657 6 14V9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9ZM11.9999 21C10.5239 21 9.24793 20.19 8.55493 19H15.4449C14.7519 20.19 13.4759 21 11.9999 21Z"
            ></path>
          </svg>
        </div> */}
        {/* <div className="ml-3 cursor-pointer">
          <svg
            className="w-6 h-6 text-discord-topIcons hover:text-gray-200"
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"
            ></path>
          </svg>
        </div> */}

        {/* <a href="#" className="ml-3 ">
          <svg
            className="w-6 h-6 text-discord-topIcons hover:text-gray-200"
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"
            ></path>
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"
            ></path>
            <path
              fill="currentColor"
              d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z"
            ></path>
            <path
              fill="currentColor"
              d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8418 14.8022 11.8743 14.8834 11.9077Z"
            ></path>
          </svg>
        </a> */}
        {/* <form className="relative ml-3">
          <input
            type="text"
            placeholder="Search"
            className="w-32 rounded bg-gray-900 placeholder-discord-200 p-1 focus:outline-none leading-normal text-xs"
          />
          <span>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-discord-200 mr-2"
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
        </form> */}

        {/* <a className="ml-3 ">
          <svg
            className="w-6 h-6 text-discord-topIcons hover:text-gray-200"
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z"
              fill="currentColor"
            ></path>
          </svg>
        </a> */}
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
