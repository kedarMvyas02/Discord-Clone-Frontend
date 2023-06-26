import React, { useEffect } from "react";
import client from "../api/client";
import { useSocket } from "../socket";
import { GetUser } from "../hooks/redux";
import { hideErrorModal, showErrorModal } from "../store/error";
import { useDispatch, useSelector } from "react-redux";
import ErrorModal from "../pages/Modal/ErrorModal";
import { getDmFriends } from "../store/dmFriends";

const PopupUser = ({ user }) => {
  const { getSocket } = useSocket();
  const socket = getSocket();
  const loggedInUser = GetUser();
  const dispatch = useDispatch();
  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );
  const allFriends = useSelector((state) => state?.dmFriends?.allFriends);
  const friendExists = allFriends?.filter(
    (friend) => friend?._id === user?._id
  );
  const shouldShowFrndReqBtn =
    !friendExists?.length > 0 && loggedInUser?._id !== user?._id;

  useEffect(() => {
    dispatch(getDmFriends());
  }, []);

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
  };

  const addFriendHandler = async (values) => {
    try {
      const res = await client.post("/users/sendFriendRequest", {
        uniqueCode: values?.uniqueCode,
      });
      socket.emit("friendReqArrived", {
        from: loggedInUser?._id,
        to: values?.uniqueCode,
      });
      const heading = `Success`;
      const subHeading = `${res.data.msg}`;
      dispatch(showErrorModal({ heading, subHeading }));
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  };
  // TODO SORT DISCOVER PAGE ON MOST MEMBERS
  return (
    <div>
      <div className="bg-discord-700 w-85 flex-none scrollbar--show--hide sidebar--users--scrollbar p-3 h-full">
        <div
          className={`w-full bg-discord-indigo h-[50px] relative rounded-t-lg`}
        >
          <div className="flex items-center absolute bottom-0 left-0 -mb-12 ml-4">
            <div className="relative flex justify-center ">
              <div
                className={`flex items-center justify-center mx-auto w-20 h-20 bg-black text-white rounded-full p-2 border-6 border-discord-900`}
              >
                <img src={user?.userImage} alt="" className="rounded-full" />
              </div>
            </div>
            {shouldShowFrndReqBtn && (
              <div
                onClick={() => addFriendHandler(user)}
                className="mt-8 cursor-pointer ml-[144px] w-full h-full hover:bg-discord-700 z-10 rounded-md p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[22px] h-[22px] text-discord-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col bg-discord-900 p-4">
          <div className="p-4 flex flex-col mt-8  bg-black bg-opacity-75 rounded-lg">
            <div className="flex justify-between mt-2">
              <div className="flex flex-col">
                <span className="text-xxs text-discord-mainText font-semibold">
                  USERNAME
                </span>
                <h6 className="text-white text-xm">
                  {user?.name}{" "}
                  <span className="text-discord-mainText text-xs">
                    #{user?.uniqueCode}
                  </span>
                </h6>
              </div>
            </div>
            <hr className=" border-y-discord-600 border w-full mx-auto my-4" />

            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-xxs text-discord-mainText font-semibold">
                  EMAIL
                </span>
                <h6 className="text-white text-xm">{user?.email}</h6>
              </div>
            </div>
            <hr className=" border-y-discord-600 border w-full mx-auto my-4" />

            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-xxs text-discord-mainText font-semibold">
                  PHONE NUMBER
                </span>
                <h6 className="text-white text-xm">
                  {user?.phoneNumber
                    ? user?.phoneNumber
                    : `User haven't added their phone number yet.`}
                </h6>
              </div>
            </div>
            <hr className=" border-y-discord-600 border w-full mx-auto my-4" />

            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-xxs text-discord-mainText font-semibold">
                  DISCORD MEMBER SINCE
                </span>
                <h6 className="text-white text-xm">
                  {new Date(user?.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h6>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      <ErrorModal
        visible={visible}
        onClose={handleCloseErrorModal}
        heading={heading}
        subHeading={subHeading}
      />
    </div>
  );
};

export default PopupUser;
