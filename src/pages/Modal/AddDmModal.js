import React, { useEffect, useState } from "react";
import client from "../../api/client";
import { setRender } from "../../store/channel";
import { useSelector } from "react-redux";

const AddDmModal = ({ visible, onClose, submitHandler }) => {
  const [data, setData] = useState(null);
  const render = useSelector((state) => state.channel.render);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await client.get("/users/getFriends/");
        setData(res?.data?.allFriends);
      } catch (error) {}
    };
    fetchFriends();
  }, [render]);

  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const forSubmit = (values) => {
    submitHandler(values);
    setTimeout(onClose, 1000);
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="z-10 bg-discord-semi600 w-full sm:w-4/6 md:w-4/6 lg:w-2/6 rounded-md p-5 m-12 flex flex-row mx-auto mt-16">
        <div className="flex flex-col w-full">
          <h4 className="text-xl text-white font-semibold text-center">
            Add Friends to your DM
          </h4>
          <br />
          <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />

          {data ? (
            data?.map((data) => (
              <div
                onClick={() => forSubmit(data)}
                className="select-none font-medium flex items-center text-discord-500 cursor-pointer hover:bg-discord-900 hover:bg-opacity-50 p-2 pl-0 mt-2  mx-2 rounded-md hover:text-white text-base"
              >
                <img
                  src={data?.userImage}
                  alt=""
                  className="h-8 w-8 mx-3 rounded-2xlg mr-3"
                />
                {`${data?.friend}#${data?.uniqueCode}`}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-auto mr-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ))
          ) : (
            <>
              <h6 className="text-l text-discord-100 font-semibold text-center mt-2">
                You don't have any friends!
              </h6>
              <h6 className="text-l text-discord-100 font-semibold text-center">
                Add a friend to start Direct Messaging
              </h6>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDmModal;
