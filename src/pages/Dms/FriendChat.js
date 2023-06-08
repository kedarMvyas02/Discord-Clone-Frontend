import FriendHeader from "./FriendHeader";
import wumpus from "../../assets/wumpus.svg";
import React, { useEffect, useState } from "react";
import client from "../../api/client";
import ErrorModal from "../Modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorModal, showErrorModal } from "../../store/error";
import { useNavigate } from "react-router";

const FriendChat = () => {
  const [currentBody, setCurrentBody] = useState(null);

  useEffect(() => {
    // const getAllFriends = async () => {
    //   try {
    //     const res = await client.get("/users/getFriends");
    //     setData(res?.data);
    //     setCurrentBody(res?.data);
    //   } catch (error) {
    //     setData(error?.response?.data);
    //     setCurrentBody(error?.response?.data);
    //   }
    // };
    // getAllFriends();
  }, [currentBody]);

  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const removeFriendHandler = async (e, code) => {
    e.stopPropagation();
    try {
      const res = await client.post("/users/removeFriend", {
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
    console.log("Hii");
  };

  const navigateDmHandler = (dmId) => {
    navigate(`/channels/dm/${dmId}`);
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
          <div className="flex justify-center items-center h-screen">
            <div className="">
              <img src={wumpus} alt="" />
              <span className="ml-12 text-discord-200 ">
                No one's around here to play with Wumpus
              </span>
            </div>
          </div>
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

      {currentBody?.pendingReq && (
        <>
          <p className="hover:text-discord-500 select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-smx ml-3">
            PENDING FRIEND REQUESTS
          </p>
          {currentBody.pendingReq.map((data) => (
            <div
              key={data?.uniqueCode}
              className="select-none font-medium flex items-center  text-discord-500 hover:bg-gray-700 p-2 mt-2 mx-2 rounded-md hover:text-white text-base"
            >
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
          ))}
        </>
      )}

      {currentBody?.allFriends &&
        currentBody?.allFriends?.map((data) => (
          <React.Fragment key={data?.uniqueCode}>
            <p className="hover:text-discord-500 select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-smx ml-3">
              ALL FRIENDS
            </p>
            <div
              onClick={() => navigateDmHandler(data._id)}
              className="select-none cursor-pointer font-medium flex items-center  text-discord-500 hover:bg-gray-700 p-2 mt-2 mx-2 rounded-md hover:text-white text-base"
            >
              {/* <br /> */}
              <div className="mr-1">
                <img
                  src={data?.userImage}
                  alt=""
                  className="h-10 w-10 rounded-full mr-2"
                />
              </div>
              {`${data?.friend}#${data?.uniqueCode}`}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={(e) => removeFriendHandler(e, data?.uniqueCode)}
                className="w-5 h-5 ml-auto mr-10 hover:text-discord-red2"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
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
