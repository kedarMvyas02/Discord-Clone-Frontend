import FriendHeader from "./FriendHeader";
import wumpus2 from "../../assets/wumpus2.svg";
import wumpusAll from "../../assets/wumpusAll.svg";
import wumpusPending from "../../assets/wumpusPending.svg";
import React, { useEffect, useState } from "react";
import client from "../../api/client";
import ErrorModal from "../Modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorModal, showErrorModal } from "../../store/error";
import { useNavigate } from "react-router";
import {
  getAllFriends,
  getArrivedFriendRequests,
  getDmFriends,
  getPendingRequests,
} from "../../store/dmFriends";

const WumpusComponent = ({ message, img }) => {
  return (
    <main className="flex-grow overflow-y-scroll scrollbar-hide">
      <div className="flex items-center justify-center mt-40">
        <img src={img} alt="" />
      </div>
      <span className="flex items-center justify-center text-discord-200 mt-2">
        {message}
      </span>
    </main>
  );
};

const FriendChat = () => {
  const [clickedOn, setClickedOn] = useState("all");
  const allFriends = useSelector((state) => state.dmFriends);
  console.log(allFriends);
  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
  };

  useEffect(() => {
    if (clickedOn === "pending") {
      dispatch(getPendingRequests());
    } else if (clickedOn === "arrived") {
      dispatch(getArrivedFriendRequests());
    } else {
      dispatch(getAllFriends());
    }
  }, [clickedOn]);

  const acceptFriendReq = async (code) => {
    try {
      const res = await client.post("/users/acceptFriendRequest", {
        uniqueCode: code,
      });
      const heading = `${res.data.msg}`;
      dispatch(showErrorModal({ heading }));
      dispatch(getArrivedFriendRequests());
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  };

  const cancleReqHandler = async (code) => {
    try {
      const res = await client.post("/users/cancelFriendReq", {
        uniqueCode: code,
      });
      dispatch(getPendingRequests());
      const heading = `${res.data.msg}`;
      dispatch(showErrorModal({ heading }));
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
      dispatch(getPendingRequests());
    }
  };

  const rejectReqHandler = async (code) => {
    try {
      const res = await client.post("/users/rejectFriendReq", {
        uniqueCode: code,
      });
      const heading = `${res.data.msg}`;
      dispatch(showErrorModal({ heading }));
      dispatch(getArrivedFriendRequests());
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  };

  const removeFriendHandler = async (e, code, _id) => {
    e.stopPropagation();
    const dmExists = allFriends?.dmFriends?.filter(
      (friend) => friend?._id === _id
    );
    if (dmExists.length > 0) {
      await client.post(`/server/removeFromDm/${_id}`);
    }

    try {
      const res = await client.post("/users/removeFriend", {
        uniqueCode: code,
      });
      dispatch(getDmFriends());
      dispatch(getAllFriends());
      const heading = `${res.data.msg}`;
      dispatch(showErrorModal({ heading }));
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  };

  const navigateDmHandler = async (dmId) => {
    try {
      await client.post(`/server/addToDm/${dmId}`);
    } catch (error) {
      navigate(`/channels/@me/${dmId}`);
    }
    dispatch(getDmFriends());
    navigate(`/channels/@me/${dmId}`);
  };

  return (
    <div className="flex flex-col h-screen ">
      <div className="flex flex-col flex-grow">
        <header>
          <FriendHeader clickedOn={clickedOn} setClickedOn={setClickedOn} />
        </header>
        <hr className=" border-y-discord-transparentBlack1 border w-full  mx-auto" />
      </div>

      {/* ALL FRIENDS */}
      {clickedOn === "all" &&
        (allFriends?.allFriends === undefined ? (
          <WumpusComponent
            img={wumpusAll}
            message="Wumpus is waiting for friends. You don't have to though!"
          />
        ) : (
          <>
            <p className="hover:text-discord-500 select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-smx ml-3">
              ALL FRIENDS
            </p>
            <form className="relative p-3">
              <input
                // onClick={openSearchBarModal} TODO
                type="text"
                placeholder="Find or start a conversation"
                className="w-full h-10 rounded-default bg-gray-900 placeholder-discord-200 placeholder:text-sm p-1 px-4 font-normal text-discord-500 focus:outline-none leading-normal text-xs"
              />
              <span>
                <svg
                  className="absolute right-0 top-0 w-4 h-4 text-discord-200 mr-5 mt-3"
                  style={{ top: "11px" }}
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
            {allFriends?.allFriends?.map((data) => (
              <React.Fragment key={data?.uniqueCode}>
                <div
                  onClick={() => navigateDmHandler(data._id)}
                  className="select-none cursor-pointer font-medium flex items-center  text-discord-500 hover:bg-gray-700 p-2 mt-2 mx-2 rounded-md hover:text-white text-base"
                >
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
                    onClick={(e) =>
                      removeFriendHandler(e, data?.uniqueCode, data?._id)
                    }
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
          </>
        ))}

      {/* PENDING */}
      {clickedOn === "pending" &&
        (allFriends?.pendingFriendRequests?.length === 0 ? (
          <WumpusComponent
            message="There are no pending requests. Here's wumpus for you!"
            img={wumpusPending}
          />
        ) : (
          <>
            <p className="hover:text-discord-500 select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-smx ml-3">
              PENDING FRIEND REQUESTS
            </p>
            {allFriends?.pendingFriendRequests?.map((data) => (
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
        ))}

      {/* ARRIVED */}
      {clickedOn === "arrived" &&
        (allFriends?.arrivedFriendRequests?.length === 0 ? (
          <WumpusComponent
            img={wumpus2}
            message="Wumpus is waiting for friends. You don't have to though!"
          />
        ) : (
          <>
            <p className="hover:text-discord-500 select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-smx ml-3">
              ARRIVED FRIEND REQUESTS
            </p>
            {allFriends?.arrivedFriendRequests?.map((data) => (
              <React.Fragment key={data.uniqueCode}>
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
                    className="w-6 h-6 cursor-pointer rounded-full ml-auto mr-5 hover:bg-discord-600"
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
          </>
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
