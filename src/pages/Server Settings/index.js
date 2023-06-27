import React, { useEffect } from "react";
// import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import { getServer } from "../../store/server";
import { GetUser } from "../../hooks/redux";
import { getUserDetails } from "../../store/user";

const ServerSetting = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = GetUser();
  const data = useSelector((state) => state?.server?.serverData);

  useEffect(() => {
    dispatch(getServer(id));

    // TODO authorization not proper ig
    if (data?.owner !== user?._id) {
      navigate("/channels/@me");
    }

    dispatch(getUserDetails());
  }, [id, dispatch]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        navigate("/channels/@me");
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="bg-discord-notQuiteDark flex w-full">
      <div className="mx-auto flex  w-2/3">
        {/* <Sidebar className="w-64" /> */}
        <div className="flex-1 px-4">
          <div className="flex justify-between mt-16">
            <h3 className="text-white text-xl font-bold">Server Overview</h3>
            <div
              className="flex flex-col"
              onClick={() => navigate("/channels/@me")}
            >
              <button className="rounded-full p-2 flex items-center justify-center hover:bg-discord-closeButton border-2 border-discord-popOutHeader focus:outline-none">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="fill-current w-4 h-4 text-discord-topIcons"
                >
                  <path d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                </svg>
              </button>
              <h6 className="text-discord-popOutHeader text-sm text-center">
                Esc
              </h6>
            </div>
          </div>
          <Account server={data} />
        </div>
      </div>
    </div>
  );
};

export default ServerSetting;
