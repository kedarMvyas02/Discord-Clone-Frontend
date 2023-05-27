import React, { useEffect, useState } from "react";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Channel from "./Channel";
import axios from "axios";

const Me = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API endpoint
    axios
      .get("http://127.0.0.1:8000/server/getServer")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleAddChannel = () => {
    const channelName = prompt("Enter a new Channel Name");

    if (channelName) {
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col space-y-3 bg-discord-900 p-3 min-w-max ">
        {/* TODO discord icon hover:rounded-2xl */}
        <div className="h-12 bg-discord-600 rounded-full flex justify-center items-center cursor-pointer transition-none duration-100 ease-out hover:bg-discord-indigo ">
          <img src="https://rb.gy/kuaslg" alt="" className="h-5" />
        </div>
        <hr className=" border-gray-700 border w-8 mx-auto" />
        <img
          src="https://rb.gy/qidcpp"
          alt=""
          className="h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl"
        />
        <img
          src="https://rb.gy/zxo0lz"
          alt=""
          className="h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl"
        />
        <img
          src="https://rb.gy/qidcpp"
          alt=""
          className="h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl"
        />
        <img
          src="https://rb.gy/zxo0lz"
          alt=""
          className="h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl"
        />
        {/* TODO discord plus icon hover:rounded-2xl */}
        <div className="h-12 bg-discord-600 rounded-full flex justify-center items-center cursor-pointer transition-none duration-100 ease-out hover:bg-discord-green group">
          <PlusIcon className="text-discord-green h-5 group-hover:text-white" />
        </div>
      </div>
      <div className="bg-discord-700 flex flex-col min-w-max cursor-pointer">
        <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-gray-600">
          Official Kedar Server...
          <ChevronDownIcon className="h-5 ml-2 " />
        </h2>
        <div className="text-discord-200 flex-grow overflow-y-scroll scrollbar-hide">
          <div className="flex items-center p-2 mb-2">
            <ChevronDownIcon className="h-3 mr-2   " />
            <h4 className="fonts-semibold">Channels</h4>
            <PlusIcon
              className="h-6 ml-auto cursor-pointer hover:text-white"
              onClick={handleAddChannel}
            />
          </div>
          <div className="flex flex-col space-y-2 px-2 mb-4">
            <Channel className="mb-14 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;
// 02:49:00 hrs on https://www.youtube.com/watch?v=MtT5Xuf9_xU&list=LL&index=1&t=13979s
