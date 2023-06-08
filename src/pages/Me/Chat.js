import React, { useRef, useState } from "react";
import { selectChannelId, selectChannelName } from "../../store/channel";
import { useSelector } from "react-redux";
import user from "../../store/user";
import Header from "./Header";
import Message from "../Dms/Message";

const Chat = () => {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const temp = useSelector((state) => state.user);
  const user = temp?.user?.data?.userWithLogin;

  const [msg, setMsg] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    if (msg !== "") {
      console.log(msg);
    }
    setMsg("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow">
        <header>
          <Header channelName={channelName} />
        </header>
        <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
        <main className="flex-grow overflow-y-scroll scrollbar-hide">
          <Message />
        </main>
      </div>
      <div className="flex items-center bg-discord-chatInputBg mx-4 mb-5 rounded-lg justify-end mt-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="hover:bg-discord-iconHover cursor-pointer text-discord-mainTextHover opacity-75 hover:opacity-100 mr-4 p-2 rounded-md w-10 h-10"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
            clipRule="evenodd"
          />
        </svg>
        <form className="flex-grow-default">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
            className="bg-transparent focus:outline-none text-discord-mainTextHover w-full placeholder-discord-popOutHeader text-sm"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          // class=""
          onClick={sendMessage}
          className="feather feather-send hover:bg-discord-iconHover cursor-pointer text-discord-mainTextHover opacity-75 hover:opacity-100 py-2 rounded-md w-10 h-10"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </div>
    </div>
  );
};

export default Chat;
