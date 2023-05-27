import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.styles.scss";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnlineUsers from "./components/OnlineUsers";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Me from "./pages/Me/Me";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token?" element={<ResetPassword />} />
        <Route path="/channels" element={<OnlineUsers />} />
        <Route path="/channels/me" element={<Me />} />
        {/* <Route path="/channels/me/:dmId" element={<Me />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
