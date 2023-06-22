import React from "react";
import client from "../../api/client";
import { GetUser } from "../../hooks/redux";
import { useDispatch } from "react-redux";
import { showErrorModal } from "../../store/error";

const Card = ({ size, description, title, profile, bg, _id }) => {
  const user = GetUser();
  const dispatch = useDispatch();

  const joinServer = async () => {
    try {
      await client.post(`/server/join/${_id}`, {
        uniqueCode: user?.uniqueCode,
      });
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  };

  return (
    <div onClick={joinServer} className="w-full cursor-pointer">
      {/* Banner  */}
      <div className="  h-40 flex  w-full">
        <img
          src={bg}
          alt=""
          className="rounded-t-[0.8rem] object-cover w-full"
        />
      </div>
      <div className="bg-[#292b2f] relative h-[11.5rem] px-[1rem] rounded-b-[0.8rem] ">
        {/* Profile Pic  */}
        <div className="absolute -top-8  left-4 w-16 h-16 flex rounded-[1rem] p-1 bg-[#292b2f]">
          <img src={profile} alt="" className="object-cover rounded-[1rem]" />
        </div>

        {/* Title  */}
        <p className="text-white font-bold text-[17px] pt-9 ml-18 pt-2">
          {title}
        </p>

        {/* Description  */}
        <p className=" text-gray-400 font-medium text-[15px] pt-1 ml-18">
          {description}
        </p>
        {/* Size  */}
        <p className=" text-gray-400 font-medium text-[13.5px] pt-6 pb-4 ">
          Total Members :- {size}
        </p>
      </div>
    </div>
  );
};

export default Card;
