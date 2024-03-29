import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChannelInfo } from "../../store/channel";
import { setOtherActiveTab } from "../../store/activeTabManagement";
import client from "../../api/client";
import { getServer } from "../../store/server";

const TextChannel = ({ channelName, channelId, serverId, unreadMessages }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const otherActiveTab = useSelector((state) => state?.tab?.otherActiveTab);

  const setTextChannel = async () => {
    dispatch(
      setChannelInfo({
        channelId: channelId,
        channelName: channelName,
      })
    );
    dispatch(setOtherActiveTab(channelId));

    await client.post(`/server/readChannelMessages/${channelId}`);
    dispatch(getServer(serverId));
    navigate(`/channels/${serverId}/${channelId}`);
  };

  return (
    <div
      // className="select-none font-medium flex items-center cursor-pointer hover:bg-gray-600 p-1 rounded-md hover:text-white focus:text-white focus:bg-gray-600"
      className={`${
        otherActiveTab === channelId ? "text-white bg-gray-600" : ""
      } select-none font-medium flex items-center cursor-pointer hover:bg-gray-600 p-1 rounded-md hover:`}
      onClick={setTextChannel}
    >
      <div className="h-4 mr-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-5"
        >
          <path
            fillRule="evenodd"
            d="M11.097 1.515a.75.75 0 01.589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 111.47.294L16.665 7.5h3.585a.75.75 0 010 1.5h-3.885l-1.2 6h3.585a.75.75 0 010 1.5h-3.885l-1.08 5.397a.75.75 0 11-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 01-1.47-.294l1.02-5.103H3.75a.75.75 0 110-1.5h3.885l1.2-6H5.25a.75.75 0 010-1.5h3.885l1.08-5.397a.75.75 0 01.882-.588zM10.365 9l-1.2 6h4.47l1.2-6h-4.47z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {channelName}
      {unreadMessages !== 0 && (
        <span className="inline-block bg-green-500 text-white text-xs px-[6px] ml-auto rounded-full">
          {unreadMessages}
        </span>
      )}
    </div>
  );
};

export default TextChannel;
