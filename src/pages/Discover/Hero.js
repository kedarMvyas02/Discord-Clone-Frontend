import React from "react";
import hero from "./photos/hero2.webp";
import { FiSearch } from "react-icons/fi";

const Hero = ({ setValue }) => {
  return (
    <div className="relative  h-[13rem] sm:h-[16rem]  md:h-[19rem] rounded-[0.3rem] z-10">
      {/* Background Image */}
      <div className="absolute  flex   w-full ">
        <img
          src={hero}
          alt=""
          className="object-cover w-full rounded-[0.3rem] h-[13rem]  md:h-[19rem] sm:h-[16rem]  "
        />
      </div>
      {/* Overlay */}
      <div className="absolute  flex   w-full h-full bg-black/20 z-10 "></div>

      {/* Search */}
      <div className="relative z-20   flex flex-col items-center justify-center  h-full font-bold text-white  pb-0 space-y-2">
        <p className="text-[19px] md:text-[24px] font-black">
          Find your community on Discord
        </p>
        <p className="pb-2 text-[13.5px] md:text-[17px]    text-white/70">
          From gaming, to music, to study, there's a place for you.
        </p>
        <div className="relative flex items-center mb-4">
          <input
            type="search"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Explore servers"
            className="rounded-[0.3rem] pl-4 placeholder:text-[14px] md:placeholder:text-[16px] placeholder:text-gray-500 outline-0 py-2 md:py-3 w-[25rem] md:w-[35rem] text-black"
          />
          <FiSearch className="absolute   text-black right-5" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
