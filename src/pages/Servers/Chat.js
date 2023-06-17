import React, { useEffect, useRef, useState } from "react";
import { selectChannelId, selectChannelName } from "../../store/channel";
import { useSelector } from "react-redux";
import Header from "./Header";
import Message from "../Dms/Message";
import { useSocket } from "../../socket";
import wumpus from "../../assets/wumpus.svg";
import client from "../../api/client";
import { useParams } from "react-router";
import { GetUser } from "../../hooks/redux";
import {
  selectIsConnectedToRoom,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Conference from "./Conference";

const Chat = () => {
  const { serverId } = useParams();
  const [msg, setMsg] = useState("");
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const user = GetUser();
  const chatRef = useRef();
  const { getSocket } = useSocket();
  const socket = getSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleNavoMessage = (data) => {
      const temp = data?.populatedChat;

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
  }, [channelId, user, socket]);

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

  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const { isLocalAudioEnabled, toggleAudio, toggleVideo } = useAVToggle();
  const hmsActions = useHMSActions();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow">
        <header>
          <Header channelName={channelName} />
        </header>
        <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
      </div>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {isConnected ? (
          <div className="bg-black">
            <Conference />
            <div className="flex justify-center items-center">
              <div className="z-10  flex my-5">
                {/* VIDEO  */}
                <div
                  onClick={toggleVideo}
                  className="bg-discord-800 mx-4 p-3 rounded-full cursor-pointer text-white hover:text-opacity-100 hover:bg-discord-900"
                >
                  <svg
                    x="0"
                    y="0"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.526 8.149C21.231 7.966 20.862 7.951 20.553 8.105L18 9.382V7C18 5.897 17.103 5 16 5H4C2.897 5 2 5.897 2 7V17C2 18.104 2.897 19 4 19H16C17.103 19 18 18.104 18 17V14.618L20.553 15.894C20.694 15.965 20.847 16 21 16C21.183 16 21.365 15.949 21.526 15.851C21.82 15.668 22 15.347 22 15V9C22 8.653 21.82 8.332 21.526 8.149Z"
                    ></path>
                  </svg>
                </div>
                {/* SCREEN SHARING */}
                <div
                  // onClick={toggleScreenShare}
                  className="bg-discord-800 mx-4 p-3 rounded-full cursor-pointer text-white hover:text-opacity-100 hover:bg-discord-900"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2 4.5C2 3.397 2.897 2.5 4 2.5H20C21.103 2.5 22 3.397 22 4.5V15.5C22 16.604 21.103 17.5 20 17.5H13V19.5H17V21.5H7V19.5H11V17.5H4C2.897 17.5 2 16.604 2 15.5V4.5ZM13.2 14.3375V11.6C9.864 11.6 7.668 12.6625 6 15C6.672 11.6625 8.532 8.3375 13.2 7.6625V5L18 9.6625L13.2 14.3375Z"
                    ></path>
                  </svg>
                </div>
                {/* MICROPHONE */}
                <div
                  onClick={toggleAudio}
                  className="bg-discord-800 mx-4 p-3 rounded-full cursor-pointer text-white hover:text-opacity-100 hover:bg-discord-900"
                >
                  {!isLocalAudioEnabled ? (
                    <svg
                      aria-hidden="true"
                      role="img"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z"
                        className="text-red-600"
                        fill="currentColor"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      role="img"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V22H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  )}
                </div>
                {/* CUT CALL */}
                <div
                  onClick={() => hmsActions.leave()}
                  className="bg-red-600 mx-4 p-3 rounded-full cursor-pointer text-white"
                >
                  <svg
                    class="controlIcon-10O-4h centerIcon-JYpTUi"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.1169 1.11603L22.8839 2.88403L19.7679 6.00003L22.8839 9.11603L21.1169 10.884L17.9999 7.76803L14.8839 10.884L13.1169 9.11603L16.2329 6.00003L13.1169 2.88403L14.8839 1.11603L17.9999 4.23203L21.1169 1.11603ZM18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : !channelId ? (
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
            className="bg-transparent disabled:cursor-not-allowed focus:outline-none text-discord-mainTextHover w-full placeholder-discord-popOutHeader text-sm"
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
*/
