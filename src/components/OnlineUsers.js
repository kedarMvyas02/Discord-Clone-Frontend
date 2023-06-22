import React from "react";

const OnlineUsers = ({ allMembers }) => {
  return (
    <div className="bg-discord-700 w-64 flex-none scrollbar--show--hide sidebar--users--scrollbar p-3">
      <h3 className="text-discord-sideBarChannels mb-4 mt-3 font-semibold text-xs uppercase tracking-wide">
        All Members
      </h3>
      {allMembers?.map(({ user }) => (
        <div className="text-discord-sideBarChannels mt-2 hover:text-discord-100 flex hover:bg-discord-selectMuted p-1 rounded-md cursor-pointer">
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
        </div>
      ))}
    </div>
  );
};

export default OnlineUsers;
