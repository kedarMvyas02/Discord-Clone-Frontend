import FriendHeader from "./FriendHeader";
import wumpus from "../../assets/wumpus.svg";
import React, { useEffect, useState } from "react";
import client from "../../api/client";
import ErrorModal from "../Modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorModal, showErrorModal } from "../../store/error";

const FriendChat = () => {
  const [currentBody, setCurrentBody] = useState(null);
  console.log(currentBody);

  useEffect(() => {
    if (
      currentBody?.message ||
      currentBody?.pendingReq ||
      currentBody?.allFriends ||
      currentBody?.arrivedReq
    ) {
      // TODO fetch user details
    }
  }, [currentBody]);

  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );
  const dispatch = useDispatch();

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
  };

  const acceptFriendReq = async (code) => {
    try {
      const res = await client.post("/users/acceptFriendRequest", {
        uniqueCode: code,
      });
      const heading = `${res.data.msg}`;
      dispatch(showErrorModal({ heading }));
      setCurrentBody({});
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
      setCurrentBody({});
    }
  };

  const cancleReqHandler = async (code) => {
    try {
      const res = await client.post("/users/cancelFriendReq", {
        uniqueCode: code,
      });
      const heading = `${res.data.msg}`;
      dispatch(showErrorModal({ heading }));
      setCurrentBody({});
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
      setCurrentBody({});
    }
  };

  const rejectReqHandler = async (code) => {
    try {
      const res = await client.post("/users/rejectFriendReq", {
        uniqueCode: code,
      });
      const heading = `${res.data.msg}`;
      dispatch(showErrorModal({ heading }));
      setCurrentBody({});
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
      setCurrentBody({});
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow">
        <header>
          <FriendHeader setCurrentBody={setCurrentBody} />
        </header>
        <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
      </div>
      {!currentBody && (
        <main className="flex-grow overflow-y-scroll scrollbar-hide">
          <div className="flex items-center justify-center mt-10">
            <img src={wumpus} alt="" />
          </div>
          <span className="flex items-center justify-center text-discord-200 mt-2">
            No one's around here to play with Wumpus
          </span>
        </main>
      )}
      {currentBody?.message && (
        <main className="flex-grow overflow-y-scroll scrollbar-hide">
          <p className="hover:text-discord-500 select-none font-bold flex items-center rounded-md text-discord-200 space-y-2 mt-4 text-xl justify-center">
            {currentBody?.message}
          </p>
          <div className="flex items-center justify-center mt-10">
            <img src={wumpus} alt="" />
          </div>
          <span className="flex items-center justify-center text-discord-200 mt-2">
            No one's around here to play with Wumpus
          </span>
        </main>
      )}
      {currentBody?.pendingReq &&
        currentBody?.pendingReq?.map((data) => (
          <React.Fragment key={data?.uniqueCode}>
            <p className="hover:text-discord-500 select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-smx ml-3">
              PENDING FRIEND REQUESTS
            </p>
            <div className="select-none font-medium flex items-center  text-discord-500 hover:bg-gray-700 p-2 mt-2 mx-2 rounded-md hover:text-white text-base">
              <br />
              <div className="mr-1">
                <img
                  src={data?.userImage}
                  alt=""
                  className="h-10 w-10 rounded-full mr-2"
                />
              </div>
              {`${data?.friend}#${data?.uniqueCode} (pending)`}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => cancleReqHandler(data?.uniqueCode)}
                className="w-6 h-6 cursor-pointer rounded-full ml-auto hover:bg-discord-600 mr-18"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
          </React.Fragment>
        ))}
      {currentBody?.allFriends &&
        currentBody?.allFriends?.map((data) => (
          <React.Fragment key={data?.uniqueCode}>
            <p className="hover:text-discord-500 select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-smx ml-3">
              ALL FRIENDS
            </p>
            <div className="select-none font-medium flex items-center  text-discord-500 hover:bg-gray-600 p-2 mt-2 mx-2 rounded-md hover:text-white text-base">
              <br />
              <div className="mr-1">
                <img
                  src={data?.userImage}
                  alt=""
                  className="h-10 w-10 rounded-full mr-2"
                />
              </div>
              {`${data?.friend}#${data?.uniqueCode}`}
            </div>
          </React.Fragment>
        ))}
      {currentBody?.arrivedReq &&
        currentBody?.arrivedReq?.map((data) => (
          <React.Fragment key={data.uniqueCode}>
            <p className="hover:text-discord-500 select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-smx ml-3">
              ARRIVED FRIEND REQUESTS
            </p>
            <div className="select-none font-medium flex items-center  text-discord-500 hover:bg-discord-700 p-2 mt-2 mx-5 ml-10 rounded-md hover:text-white text-base">
              <br />
              <div className="mr-1">
                <img
                  src={data?.userImage}
                  alt=""
                  className="h-10 w-10 rounded-full mr-2"
                />
              </div>
              {`${data?.user}#${data?.uniqueCode}`}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => acceptFriendReq(data?.uniqueCode)}
                className="w-6 h-6 cursor-pointer rounded-full ml-auto mr-5 hover:bg-discord-600 "
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => rejectReqHandler(data?.uniqueCode)}
                className="w-6 h-6 cursor-pointer rounded-full hover:bg-discord-600 mr-18"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
          </React.Fragment>
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

export default FriendChat;
//  taru forget vala btav f
// frontend ma