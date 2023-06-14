import React from "react";

const Topic = ({ title, icon }) => {
  return (
    <div className="flex text-white/50 items-center text-[16px]">
      <button className="flex items-center hover:bg-discord-indigo p-1 hover:text-white focus:bg-discord-indigo focus:text-white  w-full py-2.5 rounded-[0.4rem] font-normal duration-100 ease-out ">
        <div className="pl-3 text-[20px]">{icon}</div>
        <p className="ml-2">{title}</p>
      </button>
    </div>
  );
};

export default Topic;
