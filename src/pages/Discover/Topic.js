import React from "react";
import { useSelector } from "react-redux";

const Topic = ({ title, icon }) => {
  const otherActiveTab = useSelector((state) => state?.tab?.otherActiveTab);

  return (
    <div className="flex text-white/50 items-center text-[16px]">
      <button
        className={`flex items-center hover:bg-discord-indigo p-1 hover:text-white w-full py-2.5 rounded-[0.4rem] font-normal duration-100 ease-out ${
          otherActiveTab === title ? "bg-discord-indigo text-white" : ""
        }`}
      >
        <div className="pl-3 text-[20px]">{icon}</div>
        <p className="ml-2">{title}</p>
      </button>
    </div>
  );
};

export default Topic;
