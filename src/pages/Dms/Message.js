import React from "react";
import { useSelector } from "react-redux";

const Message = () => {
  const temp = useSelector((state) => state.user);
  const user = temp?.user?.data?.userWithLogin;

  const deleteMessageHandler = () => {};

  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-discord-messageBg group">
      <img
        src={user?.userImage}
        alt=""
        className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl"
      />
      <div className="flex flex-col ">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm cursor-pointer">
            {user?.name}
          </span>
          <span className="text-discord-popOutHeader text-xs">
            {new Date(user?.createdAt).toLocaleString()}
          </span>
        </h4>
        <p className="text-sm text-discord-100">THE_MESSAGE</p>
      </div>
      {/* {user?.email === email && ()} */}
      <div
        onClick={deleteMessageHandler}
        className="hover:bg-discord-red2 text-discord-red2 mr-5 hover:text-white cursor-pointer p-1 ml-auto rounded-2xlg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 hidden group-hover:inline"
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Message;
