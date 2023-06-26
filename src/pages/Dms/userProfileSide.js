import React from "react";

const UserProfileSide = ({ user }) => {
  return (
    <div>
      <div className="bg-discord-700 w-85 flex-none scrollbar--show--hide sidebar--users--scrollbar p-3 h-full">
        {/* <div className="w-full flex flex-col mx-4 mx-auto"> */}
        <h3 className="text-discord-sideBarChannels mb-4 mt-1 font-semibold text-xs uppercase tracking-wide ml-4">
          USER PROFILE
        </h3>
        <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
        <div
          className={`w-full bg-discord-indigo h-[50px] mt-6 relative rounded-t-lg`}
        >
          <div className="flex items-center absolute bottom-0 left-0 -mb-16 ml-4">
            <div className="relative flex justify-center ">
              <div
                className={`flex items-center justify-center mx-auto w-20 h-20 text-white rounded-full border-6 border-discord-900`}
              >
                <img src={user?.userImage} alt="" className="w-[70px] rounded-full" />
              </div>
            </div>
            <div className="flex items-center ml-2">
              <p className="text-white text-medium font-bold text-xm">
                {user?.name}{" "}
              </p>
              <p className="text-discord-mainText text-medium text-xm ml-1 mt-1">
                #{user?.uniqueCode}
              </p>
            </div>
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
    </div>
  );
};

export default UserProfileSide;
