import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../store/user";
import { useNavigate } from "react-router";

const Friends = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServer = async () => {
      dispatch(getUserDetails());
    };
    fetchServer();
  }, [dispatch]);

  const friendsNavigateHandler = () => {
    navigate("/channels/dm");
  };

  const temp = useSelector((state) => state.user);
  const user = temp?.user?.data?.userWithLogin;

  return (
    <div className="flex h-screen">
      <div className="bg-discord-700 flex flex-col" style={{ width: "250px" }}>
        <form className="relative p-3">
          <input
            type="text"
            placeholder="Find or start a conversation"
            className="w-56 h-7 rounded-default bg-gray-900 placeholder-discord-200 placeholder:text-smx p-1 font-normal text-discord-500 focus:outline-none leading-normal text-xs"
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
        <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto" />
        <div
          onClick={friendsNavigateHandler}
          className="select-none font-medium flex items-center text-discord-500 cursor-pointer hover:bg-gray-600 p-2 mt-2 mx-2 rounded-md hover:text-white text-base"
        >
          <div className="mr-1">
            <svg
              className="linkButtonIcon-7rsZcu h-8 w-7 mx-3 mr-2"
              aria-hidden="true"
              role="img"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="currentColor"
                  fillRule="nonzero"
                  d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                  transform="translate(2 4)"
                ></path>
                <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
              </g>
            </svg>
          </div>
          Friends
        </div>
        <div className="select-none font-medium flex items-center p-1 rounded-md text-discord-200 space-y-2 px-2 mt-2 text-xs">
          <span className="hover:text-discord-500">DIRECT MESSAGES</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 ml-auto cursor-pointer hover:text-discord-500"
          >
            <path
              fillRule="evenodd"
              d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* FRIENDS LIST */}
        <div className="select-none font-medium flex items-center text-discord-500 cursor-pointer hover:bg-gray-600 p-2 mt-2 mt-0 mx-2 rounded-md hover:text-white text-base">
          <img
            src="http://res.cloudinary.com/dbi3rrybd/image/upload/v1686030050/Discord/up7j60ht83jtqwrnd1vy.jpg"
            alt=""
            className="h-8 w-8 mx-3 rounded-2xlg mr-3"
          />
          Kedar
        </div>
        <div className="select-none font-medium flex items-center text-discord-500 cursor-pointer hover:bg-gray-600 p-2 mt-2 mt-0 mx-2 rounded-md hover:text-white text-base">
          <img
            src="http://res.cloudinary.com/dbi3rrybd/image/upload/v1686030050/Discord/up7j60ht83jtqwrnd1vy.jpg"
            alt=""
            className="h-8 w-8 mx-3 rounded-2xlg mr-3"
          />
          Kedar
        </div>
        <div className="select-none font-medium flex items-center text-discord-500 cursor-pointer hover:bg-gray-600 p-2 mt-2 mt-0 mx-2 rounded-md hover:text-white text-base">
          <img
            src="http://res.cloudinary.com/dbi3rrybd/image/upload/v1686030050/Discord/up7j60ht83jtqwrnd1vy.jpg"
            alt=""
            className="h-8 w-8 mx-3 rounded-2xlg mr-3"
          />
          Kedar
        </div>

        {/* USER SECTION */}
        <div className=" bg-discord-secondPrimary mt-auto p-2 flex justify-between items-center space-x-8 ">
          <div className="flex items-center space-x-1">
            <img
              src={user?.userImage}
              loading="lazy"
              alt="userImage"
              className="h-8 rounded-full"
            />
            <h4 className="text-white text-xs font-medium">
              {user?.name}
              <span className="text-discord-200 block">
                #{user?._id.substring(0, 4)}
              </span>
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
    </div>
  );
};

export default Friends;
