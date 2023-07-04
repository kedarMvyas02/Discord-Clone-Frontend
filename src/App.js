import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useHMSActions } from "@100mslive/react-sdk";
import { useSocket } from "./socket";
import { GetUser } from "./hooks/redux/index";
import LoadingSpinner from "./pages/Modal/LoadingSpinner";

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const NotFound = lazy(() => import("./pages/404/NotFound"));
const Index = lazy(() => import("./pages/Servers/Index"));
const IndexDM = lazy(() => import("./pages/Dms/IndexDM"));
const Home = lazy(() => import("./pages/Discover/Home"));
const Setting = lazy(() => import("./pages/User Settings"));
const ServerSetting = lazy(() => import("./pages/Server Settings"));
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);

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
      <Suspense
        fallback={
          <>
            <div
              id="container"
              className="fixed inset-0 bg-black z-50 backdrop-blur-sm flex justify-center pb-32 pt-48 items-center"
            >
              <img
                src="http://res.cloudinary.com/dbi3rrybd/image/upload/v1687949096/Discord/x9r8l0r4fgxbycugrjj6.gif"
                alt=""
              />
            </div>
          </>
        }
      >
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
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
