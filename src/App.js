import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.styles.scss";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnlineUsers from "./components/OnlineUsers";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
// import Me from "./pages/Me/Me";
import NotFound from "./pages/404/NotFound";
import Index from "./pages/Servers/Index";
import IndexDM from "./pages/Dms/IndexDM";
import { useSocket } from "./socket";
import { useSelector } from "react-redux";
// import Dm from "./pages/Dm/Dm.js";

const App = () => {
  const temp = useSelector((state) => state.user);
  const user = temp?.user?.data?.userWithLogin;
  const { getSocket } = useSocket();

  useEffect(() => {
    const socket = getSocket();
    socket.emit("add-user", { user_id: user?._id });
  }, [user, getSocket]);

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// {/* <Route path="/channels" element={<OnlineUsers />} /> */}
