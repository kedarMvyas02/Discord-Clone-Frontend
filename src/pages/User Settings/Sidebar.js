import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../store/user";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    if (user) {
      try {
        dispatch(logoutSuccess());
        navigate("/login");

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
          <a href="#" className="flex item-centers">
            <span className="ml-2 font-bold text-xs tracking-tight">
              USER SETTINGS
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2 mt-1">
          <a href="#" className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              My Account
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              User Profile
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Privacy & Safety
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Authorized Apps
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 px-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Connections
            </span>
          </a>
        </li>
      </ul>
      {/* END USER SETTINGS */}

      {/* BILLING SETTINGS */}
      <ul className="mt-4 border-t-2 border-discord-backgroundModifierAccent py-4 px-2">
        <li className="text-discord-sideBarChannels">
          <a href="#" className="flex item-centers">
            <span className="ml-2 font-bold text-xs tracking-tight">
              BILLING SETTINGS
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <a href="#" className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Discord Nitro
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Server Boost
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Gift Inventory
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Billing
            </span>
          </a>
        </li>
      </ul>
      {/* END BILLING SETTINGS */}

      {/* APP SETTINGS */}
      <ul className="mt-4 border-t-2 border-discord-backgroundModifierAccent py-4 px-2">
        <li className="text-discord-sideBarChannels">
          <a href="#" className="flex item-centers">
            <span className="ml-2 font-bold text-xs tracking-tight">
              APP SETTINGS
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <a href="#" className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Appearance
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Accessibility
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Voice & Video
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Text & Images
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Notifications
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Keybinds
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Language
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Streamer Mode
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2">
          <a href="#" className="flex item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Advanced
            </span>
          </a>
        </li>
      </ul>
      {/* END APP SETTINGS */}

      {/*  ACTIVITY SETTINGSS */}
      <ul className="mt-4 border-t-2 border-discord-backgroundModifierAccent py-4 px-2">
        <li className="text-discord-sideBarChannels">
          <a href="#" className="flex item-centers">
            <span className="ml-2 font-bold text-xs tracking-tight">
              ACTIVITY SETTINGS
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <a href="#" className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Activity Status
            </span>
          </a>
        </li>
      </ul>
      {/* END  ACTIVITY SETTINGS */}

      {/*  LOG */}
      <ul className="mt-4 border-t-2 border-discord-backgroundModifierAccent py-4 px-2">
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <a href="#" className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Change Log
            </span>
          </a>
        </li>
        <li className="text-discord-sideBarChannels hover:bg-discord-selectMuted hover:text-discord-100 rounded py-1 mx-2 mt-1">
          <a href="#" className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              HypeSquad
            </span>
          </a>
        </li>
      </ul>
      {/* END LOG */}

      {/*  LOGOUT */}
      <ul className="mt-4 border-t-2 flex justify-center items-center border-discord-backgroundModifierAccent py-4 px-8 mx-4">
        <li className="text-discord-red hover:bg-discord-selectMuted rounded py-1 mx-4 mt-1">
          <button onClick={logoutHandler} className="item-centers">
            <span className="ml-1 text-sm font-medium tracking-tight">
              Log Out
            </span>
          </button>
        </li>
      </ul>
      {/* END LOGOUT */}
    </div>
  );
}
