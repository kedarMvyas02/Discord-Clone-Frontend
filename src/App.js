import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.styles.scss";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NotFound from "./pages/404/NotFound";
import Index from "./pages/Servers/Index";
import IndexDM from "./pages/Dms/IndexDM";
import { useSocket } from "./socket";
import Home from "./pages/Discover/Home";
import { useHMSActions } from "@100mslive/react-sdk";
import { GetUser } from "./hooks/redux/index";
import Setting from "./pages/User Settings";
import ServerSetting from "./pages/Server Settings";
import ChannelSetting from "./pages/Channel Settings";

const App = () => {
  const user = GetUser();
  const { getSocket } = useSocket();

  useEffect(() => {
    const socket = getSocket();
    socket.emit("add-user", { user_id: user?._id });
  }, [user, getSocket]);

  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave();
    };
  }, [hmsActions]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token?" element={<ResetPassword />} />
        <Route path="/channels/:serverId" element={<Index />} />
        <Route path="/channels/:serverId/:dmId" element={<Index />} />
        <Route path="/channels/@me" element={<IndexDM />} />
        <Route path="/channels/@me/:dmId" element={<IndexDM />} />
        <Route path="/discover" element={<Home />} />
        <Route path="/userSettings" element={<Setting />} />
        <Route path="/serverSettings/:id" element={<ServerSetting />} />
        <Route path="/channelSettings/:id" element={<ChannelSetting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
