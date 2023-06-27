import React from "react";
import Card from "./Card";

const Featured = ({ servers }) => {
  return (
    <div className="pt-6   ">
      <div className="text-white pb-4">
        <p className="font-bold text-[20px]">Featured Servers</p>
        <p className="text-white/50">
          Some awesome Discords we think you'd love
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-y-8 xs:gap-x-2 sm:gap-x-4 mb-4  ">
        {servers
          ?.sort((a, b) => b?.members?.length - a?.members?.length)
          ?.map((card) => (
            <Card
              _id={card?._id}
              bg={card?.avatar}
              profile={card?.avatar}
              title={card?.name}
              description={card?.description}
              size={card?.members?.length}
              key={card?.description}
            />
          ))}
      </div>
    </div>
  );
};

export default Featured;
