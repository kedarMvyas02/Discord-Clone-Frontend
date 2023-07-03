import React, { useEffect, useState } from "react";
import { getAllFriends } from "../../store/dmFriends";
import { useDispatch, useSelector } from "react-redux";

const SearchBarFriendsModal = ({ visible, onClose, submitHandler }) => {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const allFriends = useSelector((state) => state?.dmFriends?.allFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFriends());
  }, []);

  useEffect(() => {
    const regex = new RegExp(name, "i");
    const filteredFriends = allFriends?.filter((friend) =>
      regex.test(friend?.friend)
    );
    setData(filteredFriends);
  }, [allFriends, name]);

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
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="z-50 bg-discord-semi600 w-full sm:w-4/6 md:w-4/6 lg:w-2/6 rounded-md p-5 m-12 flex flex-row mx-auto mt-16">
        <div className="flex flex-col w-full">
          <form className="">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Search for your friends...."
              className="w-full h-12 rounded-default bg-gray-900 placeholder-discord-200 placeholder:text-xl p-1 font-normal text-discord-500 focus:outline-none leading-normal text-xl"
            />
            <span>
              <svg
                className="absolute right-0 top-0 w-4 h-4 text-discord-200 mr-5 mt-3"
                style={{ top: "6px" }}
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
                ></path>
              </svg>
            </span>
          </form>
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

export default SearchBarFriendsModal;
