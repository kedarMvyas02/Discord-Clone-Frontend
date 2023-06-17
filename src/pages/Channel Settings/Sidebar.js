import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { logoutSuccess } from "../../store/user";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    if (user) {
      try {
        await logout(user?.user?.tokens?.refresh?.token);

        // TODO LOGOUT
        dispatch(logoutSuccess());
        navigate("/login");

        //disconnect socket after logout.
        // TODO SOCKET LOGOUT
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };

  return (
    <div className="scrollbar--show--hide text-xl mt-10 channels--scrollbar bg-discord-notQuiteDark">
      {/* USER SETTINGS */}
      <ul>
        <li className="text-discord-sideBarChannels px-3">
          <div
            onClick={() => navigate("/userSettings")}
            className="flex item-centers"
          >
            <span className="ml-2 font-bold text-xs tracking-tight">
              USER SETTINGS
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2 mt-1">
          <div
            onClick={() => navigate("/userSettings")}
            className="item-centers"
          >
            <span className="ml-1 text-sm font-medium tracking-tight">
              My Account
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2">
          <div
            onClick={() => navigate("/userSettings")}
            className="flex item-centers"
          >
            <span className="ml-1 text-sm font-medium tracking-tight">
              User Profile
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Privacy & Safety
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Authorized Apps
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Connections
            </span>
          </div>
        </li>
      </ul>
      {/* END USER SETTINGS */}

      {/* BILLING SETTINGS */}
      <ul className="mt-4 border-t-2 border-discord-backgroundModifierAccent py-4 px-2">
        <li className="text-discord-sideBarChannels">
          <div className="flex item-centers">
            <span className="ml-2 font-bold text-xs tracking-tight">
              BILLING SETTINGS
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <div className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Discord Nitro
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Server Boost
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Gift Inventory
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Billing
            </span>
          </div>
        </li>
      </ul>
      {/* END BILLING SETTINGS */}

      {/* APP SETTINGS */}
      <ul className="mt-4 border-t-2 border-discord-backgroundModifierAccent py-4 px-2">
        <li className="text-discord-sideBarChannels">
          <div className="flex item-centers">
            <span className="ml-2 font-bold text-xs tracking-tight">
              APP SETTINGS
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <div className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Appearance
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Accessibility
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Voice & Video
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Text & Images
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Notifications
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Keybinds
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Language
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Streamer Mode
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <div className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Advanced
            </span>
          </div>
        </li>
      </ul>
      {/* END APP SETTINGS */}

      {/*  ACTIVITY SETTINGSS */}
      <ul className="mt-4 border-t-2 border-discord-backgroundModifierAccent py-4 px-2">
        <li className="text-discord-sideBarChannels">
          <div className="flex item-centers">
            <span className="ml-2 font-bold text-xs tracking-tight">
              ACTIVITY SETTINGS
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <div className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Activity Status
            </span>
          </div>
        </li>
      </ul>
      {/* END  ACTIVITY SETTINGS */}

      {/*  LOG */}
      <ul className="mt-4 border-t-2 border-discord-backgroundModifierAccent py-4 px-2">
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <div className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Change Log
            </span>
          </div>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <div className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              HypeSquad
            </span>
          </div>
        </li>
      </ul>
      {/* END LOG */}

      {/*  LOGOUT */}
      <ul className="mt-4 border-t-2 border-discord-backgroundModifierAccent py-4 px-2">
        <li className="text-discord-red hover:bg-discord-selectMuted rounded py-1 mx-2 mt-1">
          <button onClick={logoutHandler} className="item-centers">
            <span className="ml-1 flex justify-center items-center text-sm font-medium tracking-tight">
              Log Out
            </span>
          </button>
        </li>
      </ul>
      {/* END LOGOUT */}
    </div>
  );
}
