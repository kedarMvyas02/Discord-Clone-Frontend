import React from "react";
import { AiFillCompass } from "react-icons/ai";
import { GiConsoleController } from "react-icons/gi";
import {
  BsMusicNoteBeamed,
  BsFillPlayCircleFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { TbAtom } from "react-icons/tb";
import { FiMonitor } from "react-icons/fi";
import Topic from "./Topic";
import { useSelector } from "react-redux";

const Discover = () => {
  const temp = useSelector((state) => state.user);
  const user = temp?.user?.data?.userWithLogin;

  const topics = [
    { title: "Home", icon: <AiFillCompass /> },
    { title: "Gaming", icon: <GiConsoleController /> },
    { title: "Music", icon: <BsMusicNoteBeamed /> },
    { title: "Education", icon: <FaGraduationCap /> },
    { title: "Science & tech", icon: <TbAtom /> },
    { title: "Content Creator", icon: <BsFillPlayCircleFill /> },
    { title: "Anime & Manga", icon: <BsFillEmojiSmileFill /> },
    { title: "Movies & TV", icon: <FiMonitor /> },
  ];

  return (
    <div className="hidden xl:flex flex-col justify-between bg-[#303136] w-[18rem] shrink-0  h-screen sticky top-0">
      <div className="p-4">
        {/* Title */}
        <p className="text-white font-bold text-[24px]">Discover</p>
        {/* Topics */}
        <div className="mt-4 space-y-2">
          {topics.map((topic) => (
            <Topic title={topic.title} icon={topic.icon} />
          ))}
        </div>
      </div>

      {/* Profile Settings */}
      <div
        className=" bg-discord-secondPrimary mt-auto p-2 flex justify-between items-center space-x-8"
        style={{ marginTop: 0 }}
      >
        <div className="flex items-center space-x-1">
          <img
            src={user?.userImage}
            loading="lazy"
            alt=""
            className="h-8 rounded-full"
          />
          <h4 className="text-white text-xs font-medium">
            {user?.name}
            <span className="text-discord-200 block">#{user?.uniqueCode}</span>
          </h4>
        </div>

        <div className="text-gray-400 flex items-center">
          <div className="hover:bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover p-2 rounded-md">
            <svg
              aria-hidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="opacity-50"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="hover:bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover p-2 rounded-md">
            <svg
              className="opacity-50 h-5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2.00305C6.486 2.00305 2 6.48805 2 12.0031V20.0031C2 21.1071 2.895 22.0031 4 22.0031H6C7.104 22.0031 8 21.1071 8 20.0031V17.0031C8 15.8991 7.104 15.0031 6 15.0031H4V12.0031C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.0031V15.0031H18C16.896 15.0031 16 15.8991 16 17.0031V20.0031C16 21.1071 16.896 22.0031 18 22.0031H20C21.104 22.0031 22 21.1071 22 20.0031V12.0031C22 6.48805 17.514 2.00305 12 2.00305Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="hover:bg-discord-iconHover cursor-pointer hover:text-discord-mainTextHover p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 opacity-50"
            >
              <path
                fillRule="evenodd"
                d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
