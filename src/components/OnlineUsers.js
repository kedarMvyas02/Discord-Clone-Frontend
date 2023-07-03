import React from "react";
import Popup from "reactjs-popup";
import PopupUser from "./PopupUser";

const OnlineUsers = ({ allMembers }) => {
  return (
    <div className="bg-discord-700 w-64 flex-none scrollbar--show--hide sidebar--users--scrollbar pt-3">
      <h3 className="text-discord-sideBarChannels mb-4 mt-1 font-semibold text-xs uppercase tracking-wide ml-4">
        All Members
      </h3>
      <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
      <div className="pl-3 pt-3 select-none">
        {allMembers?.map(({ user }) => (
          <Popup
            key={user?._id}
            position="left top"
            trigger={
              <div className="text-discord-sideBarChannels cursor-pointer mt-2 hover:text-discord-100 flex hover:bg-discord-selectMuted p-2 rounded-md">
                <div className="flex justify-center">
                  <img
                    src={user?.userImage}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="flex ml-2 items-center  justify-center">
                  <span className="text-discord-100 text-sm">
                    {`${user?.name} #${user?.uniqueCode}`}
                  </span>
                </div>
              </div>
            }
          >
            <PopupUser user={user} />
          </Popup>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
