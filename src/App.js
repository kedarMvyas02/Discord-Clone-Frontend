import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const App = () => {
  const user = GetUser();
  const { getSocket } = useSocket();
  const socket = getSocket();
  const hmsActions = useHMSActions();

  useEffect(() => {
    socket.emit("add-user", { user_id: user?._id });
  }, [user, socket]);

  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave();
      socket.emit("leaving-vc", user);
    };
  }, [hmsActions, user, socket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token?" element={<ResetPassword />} />
        <Route path="/channels/:serverId/:dmId?" element={<Index />} />
        <Route path="/channels/@me/:dmId?" element={<IndexDM />} />
        <Route path="/userSettings" element={<Setting />} />
        <Route path="/serverSettings/:id" element={<ServerSetting />} />
        <Route path="/discover" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
