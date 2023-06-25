import React from "react";
import { GetUser } from "../hooks/redux";
import { getPendingRequests } from "../store/dmFriends";
import { useSocket } from "../socket";
import client from "../api/client";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorModal, showErrorModal } from "../store/error";
import ErrorModal from "../pages/Modal/ErrorModal";

const OnlineUsers = ({ allMembers }) => {
  const { getSocket } = useSocket();
  const socket = getSocket();
  console.log(allMembers);
  const loggedInUser = GetUser();
  const dispatch = useDispatch();
  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
  };

  const addFriendHandler = async (values) => {
    console.log(values);
    try {
      const res = await client.post("/users/sendFriendRequest", {
        uniqueCode: values?.uniqueCode,
      });
      socket.emit("friendReqArrived", {
        from: loggedInUser?._id,
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
  };

  return (
    <div className="bg-discord-700 w-64 flex-none scrollbar--show--hide sidebar--users--scrollbar p-3">
      <h3 className="text-discord-sideBarChannels mb-4 mt-3 font-semibold text-xs uppercase tracking-wide">
        All Members
      </h3>
      {allMembers?.map(({ user }) => (
        <div className="text-discord-sideBarChannels mt-2 hover:text-discord-100 flex hover:bg-discord-selectMuted p-1 rounded-md">
          <div className="flex justify-center">
            <img
              src={user?.userImage}
              alt=""
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="flex ml-2 items-center  justify-center">
            <span className="text-discord-sideBarChannels text-sm">
              {`${user?.name} #${user?.uniqueCode}`}
            </span>
          </div>
          {/* {loggedInUser?._id !== user?._id && ( */}
          <div
            onClick={() => addFriendHandler(user)}
            className="my-2 cursor-pointer ml-auto hover:bg-discord-700 z-10 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </div>
          {/* )} */}
        </div>
      ))}
      <ErrorModal
        visible={visible}
        onClose={handleCloseErrorModal}
        heading={heading}
        subHeading={subHeading}
      />
    </div>
  );
};

export default OnlineUsers;
