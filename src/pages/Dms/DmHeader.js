import { useHMSActions } from "@100mslive/react-sdk";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../socket";
import { GetUser } from "../../hooks/redux";
import { useParams } from "react-router";
import IncomingCall from "../Modal/IncomingCallModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "../../store/dmFriends";
import PinnedMsgsModal from "../Modal/PinnedMsgsModal";
import { hideErrorModal, showErrorModal } from "../../store/error";
import ErrorModal from "../Modal/ErrorModal";

const DmHeader = ({
  data,
  setContent,
  openUserProfile,
  setOpenUserProfile,
}) => {
  const [showModal, setShowModal] = useState({
    toggle: false,
    data: "",
  });
  const [pinnedModal, setPinnedModal] = useState(false);
  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );
  const hmsActions = useHMSActions();
  const { getSocket } = useSocket();
  const socket = getSocket();
  const user = GetUser();
  const { dmId } = useParams();
  const allFriends = useSelector((state) => state?.dmFriends?.allFriends);
  const dispatch = useDispatch();
  const friendToFind = allFriends?.find((friend) => friend?._id === data?._id);

  useEffect(() => {
    dispatch(getAllFriends());
  }, []);

  const toggleUserProfile = () => {
    setOpenUserProfile(!openUserProfile);
  };

  const handleCloseModal = () => {
    setShowModal((prevState) => {
      return {
        ...prevState,
        toggle: false,
      };
    });
  };

  const handleIncomingCall = (data) => {
    setShowModal((prevState) => {
      return {
        ...prevState,
        data,
        toggle: true,
      };
    });
  };

  const acceptCall = async () => {
    const authToken = await hmsActions.getAuthTokenByRoomCode({
      roomCode: friendToFind.roomCode, //xyf-mlsw-qlh
    });

    handleCloseModal();
    try {
      await hmsActions.join({
        userName: user?.name,
        authToken,
      });
      console.log("call started successfully");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socket?.on("incoming-call", handleIncomingCall);

    return () => {
      socket?.off("incoming-call", handleIncomingCall);
    };
  }, []);

  const handleRejectCall = () => {
    socket.emit("rejected-call", { from: user?._id, to: data?._id });
    handleCloseModal();
  };

  const handleCallRejected = async () => {
    await hmsActions.leave();
    const heading = `Call Declined`;
    const subHeading = `Your call was rejected :(`;
    dispatch(showErrorModal({ heading, subHeading }));
  };

  useEffect(() => {
    socket?.on("call-rejected", handleCallRejected);

    return () => {
      socket?.off("call-rejected", handleCallRejected);
    };
  }, []);

  const inputSearchHandler = async (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
  };

  const startVoiceCallHandler = async () => {
    socket.emit("private-call", { from: user?._id, to: dmId });

    const authToken = await hmsActions.getAuthTokenByRoomCode({
      roomCode: friendToFind.roomCode,
    });

    try {
      await hmsActions.join({
        userName: user?.name,
        authToken,
      });
      await hmsActions.setLocalVideoEnabled(false);
      console.log("call started successfully");
    } catch (e) {
      console.error(e);
    }
  };

  const startVideoCallHandler = async () => {
    socket.emit("private-call", { from: user?._id, to: dmId });

    const authToken = await hmsActions.getAuthTokenByRoomCode({
      roomCode: friendToFind.roomCode,
    });

    try {
      await hmsActions.join({
        userName: user?.name,
        authToken,
      });
      console.log("call started successfully");
    } catch (e) {
      console.error(e);
    }
  };

  const openPinnnedMsgs = () => {
    setPinnedModal(true);
  };
  const closePinnedMsgs = () => {
    setPinnedModal(false);
  };

  return (
    <div className="flex-1 flex items-center justify-between bg-discord-600 border-b  px-4 py-3 border-b border-discord-900">
      <div className="flex items-center">
        <div className="text-discord-200 text-2xl">
          <img
            src={data?.userImage}
            alt=""
            loading="lazy"
            className="h-6 w-6 rounded-full"
          />
        </div>
        <div className="ml-2 text-m text-white font-semibold">{`${data?.name} #${data?.uniqueCode}`}</div>

        {/* <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" /> */}
      </div>

      <div className="flex items-center">
        <div onClick={startVoiceCallHandler} className="ml-3 cursor-pointer">
          <svg
            x="0"
            y="0"
            className="icon-2xnN2Y text-white opacity-50 hover:opacity-75"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 5V3C16.515 3 21 7.486 21 13H19C19 8.589 15.411 5 11 5ZM17 13H15C15 10.795 13.206 9 11 9V7C14.309 7 17 9.691 17 13ZM11 11V13H13C13 11.896 12.105 11 11 11ZM14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16Z"
            ></path>
          </svg>
        </div>
        <div onClick={startVideoCallHandler} className="ml-3 cursor-pointer">
          <svg
            x="0"
            y="0"
            className="icon-2xnN2Y text-white opacity-50 hover:opacity-75"
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
        <div onClick={openPinnnedMsgs} className="cursor-pointer">
          <svg
            className="w-6 h-6 text-discord-topIcons hover:text-gray-200 ml-3"
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
        </div>
        <div className="ml-3">
          <form className="relative">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => inputSearchHandler(e)}
              className="w-40 rounded-default bg-gray-900 placeholder-discord-200 placeholder:text-sm p-1 font-normal text-discord-500 focus:outline-none leading-normal text-xs"
              // className="w-40 rounded bg-gray-900 placeholder-discord-200 p-1 focus:outline-none leading-normal text-xs"
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
          </form>
        </div>
        <div
          onClick={toggleUserProfile}
          className="cursor-pointer sm:invisible md:invisible lg:visible"
        >
          <svg
            x="0"
            y="0"
            aria-hidden="true"
            className="w-6 h-6 text-discord-topIcons hover:text-gray-200 ml-3"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C12.4883 22 12.9684 21.965 13.438 21.8974C12.5414 20.8489 12 19.4877 12 18C12 17.6593 12.0284 17.3252 12.083 17H6V16.0244C6 14.0732 10 13 12 13C12.6215 13 13.436 13.1036 14.2637 13.305C15.2888 12.4882 16.5874 12 18 12C19.4877 12 20.8489 12.5414 21.8974 13.438C21.965 12.9684 22 12.4883 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12Z"
                fill="currentColor"
              ></path>
              <path
                d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://support.discord.com/hc/en-us"
          className="ml-3"
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
      <IncomingCall
        visible={showModal.toggle}
        onClose={handleCloseModal}
        callerName={showModal?.data?.from_user?.name}
        callerImage={showModal?.data?.from_user?.userImage}
        onAcceptCall={acceptCall}
        onRejectCall={handleRejectCall}
      />
      {pinnedModal && (
        <PinnedMsgsModal
          where="DM"
          visible={pinnedModal}
          onClose={closePinnedMsgs}
          id={dmId}
        />
      )}
      <ErrorModal
        visible={visible}
        onClose={handleCloseErrorModal}
        heading={heading}
        subHeading={subHeading}
      />
    </div>
  );
};

export default DmHeader;
