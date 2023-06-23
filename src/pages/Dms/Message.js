import React from "react";
import client from "../../api/client";
import { GetUser } from "../../hooks/redux/index";

const Message = ({
  name,
  uniqueCode,
  content,
  createdAt,
  userImage,
  _id,
  onDelete,
}) => {
  const user = GetUser();

  const deleteMessageHandler = async () => {
    try {
      await client.post(`/server/deleteDmMessage/${_id}`);
      onDelete(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const pinMessageHandler = async () => {
    try {
      await client.post(`/server/pinDmMessage/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-discord-messageBg group">
      <img
        src={userImage}
        alt=""
        className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl"
      />
      <div className="flex flex-col ">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm cursor-pointer">
            {`${name}#${uniqueCode}`}
          </span>
          <span className="text-discord-popOutHeader text-xs">
            {new Date(createdAt).toLocaleString()}
          </span>
        </h4>
        <p className="text-sm text-discord-100">{content}</p>
      </div>

      <div
        onClick={pinMessageHandler}
        className="hover:bg-discord-indigo text-discord-indigo mr-2 hover:text-white cursor-pointer p-1 ml-auto rounded-2xlg"
      >
        <svg
          className="w-6 h-6 hidden group-hover:inline"
          aria-hidden="true"
          role="img"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"
          ></path>
        </svg>
      </div>

      {user?.uniqueCode === uniqueCode && (
        <div
          onClick={deleteMessageHandler}
          className="hover:bg-discord-red2 text-discord-red2 mr-5 hover:text-white cursor-pointer p-1  rounded-2xlg"
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
      )}
    </div>
  );
};

export default Message;
