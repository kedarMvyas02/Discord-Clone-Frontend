import React, { useEffect, useRef, useState } from "react";
import { selectChannelId, selectChannelName } from "../../store/channel";
import { useSelector } from "react-redux";
import Header from "./Header";
import Message from "../Dms/Message";
import { useSocket } from "../../socket";
import wumpus from "../../assets/wumpus.svg";
import client from "../../api/client";
import { useParams } from "react-router";

const Chat = () => {
  const { serverId } = useParams();
  const [msg, setMsg] = useState("");
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const temp = useSelector((state) => state.user);
  const user = temp?.user?.data?.userWithLogin;
  const chatRef = useRef();
  const { getSocket } = useSocket();
  const socket = getSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleNavoMessage = (data) => {
      const temp = data?.populatedChat;

      console.log(temp.channel._id);
      console.log("channelId", channelId);
      if (temp.channel._id === channelId) {
        setMessages((prevState) => {
          const filteredMessages = prevState.filter(
            (msg) => msg._id !== temp?._id
          );

          return [...filteredMessages, temp];
        });
      }
    };

    socket?.on("message", handleNavoMessage);
    scrollToBottom();

    return () => {
      socket?.off("message", handleNavoMessage);
    };
  }, [channelId, temp, socket]);

  // useEffect(() => {}, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await client.get(`/server/getChannelMessages/${channelId}`);
        if (res?.data?.messages) {
          setMessages(res?.data?.messages);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchMessages();
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (msg !== "") {
      socket?.emit("channel-message", {
        from: user?._id,
        to: channelId,
        server: serverId,
        message: msg,
      });
      // setMessages((prevState) => {
      //   return [
      //     ...prevState,
      //     {
      //       sender: user,
      //       createdAt: Date.now(),
      //       content: msg,
      //       _id: Date.now(),
      //     },
      //   ];
      // });
    }
    setMsg("");
  };

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow">
        <header>
          <Header channelName={channelName} />
        </header>
        <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
      </div>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {!channelId ? (
          <>
            <div className="flex items-center justify-center mt-10">
              <img src={wumpus} alt="" />
            </div>
            <span className="flex items-center text-xl justify-center text-discord-200 mt-4">
              {`Please Select a channel to continue chatting`}
            </span>
          </>
        ) : messages === null || messages.length === 0 ? (
          <>
            <div className="flex items-center justify-center mt-10">
              <img src={wumpus} alt="" />
            </div>
            <span className="flex items-center text-xl justify-center text-discord-200 mt-4">
              {`There are no messages in #${channelName}`}
            </span>
          </>
        ) : (
          messages.map((msg) => {
            const { name, uniqueCode, userImage } = msg.sender;

            return (
              <React.Fragment key={msg._id}>
                <Message
                  name={name}
                  createdAt={msg.createdAt}
                  uniqueCode={uniqueCode}
                  userImage={userImage}
                  _id={msg._id}
                  content={msg.content}
                />
              </React.Fragment>
            );
          })
        )}
        <div ref={chatRef} className="pb-16" />
      </main>
      <div className="flex items-center bg-discord-chatInputBg mx-4 mb-5 rounded-lg justify-end mt-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="hover:bg-discord-iconHover cursor-pointer text-discord-mainTextHover opacity-75 hover:opacity-100 mr-4 ml-1 my-1 p-1 rounded-md w-8 h-8"
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
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="hover:bg-discord-iconHover cursor-pointer text-discord-mainTextHover opacity-75 hover:opacity-100 py-2 rounded-md w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
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
/*
<div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow">
        <header>
          <Header channelName={channelName} />
        </header>
        <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
        <main className="flex-grow overflow-y-scroll scrollbar-hide">
          {!channelId ? (
            <>
              <div className="flex items-center justify-center mt-10">
                <img src={wumpus} alt="" />
              </div>
              <span className="flex items-center text-xl justify-center text-discord-200 mt-4">
                {`Please Select a channel to continue chatting`}
              </span>
            </>
          ) : messages === null || messages.length === 0 ? (
            <>
              <div className="flex items-center justify-center mt-10">
                <img src={wumpus} alt="" />
              </div>
              <span className="flex items-center text-xl justify-center text-discord-200 mt-4">
                {`There are no messages in #${channelName}`}
              </span>
            </>
          ) : (
            messages.map((msg) => {
              const { name, uniqueCode, userImage } = msg.sender;

              return (
                <React.Fragment key={msg._id}>
                  <Message
                    name={name}
                    createdAt={msg.createdAt}
                    uniqueCode={uniqueCode}
                    userImage={userImage}
                    _id={msg._id}
                    content={msg.content}
                  />
                </React.Fragment>
              );
            })
          )}

          <div ref={chatRef} className="pb-16" />
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
 */
