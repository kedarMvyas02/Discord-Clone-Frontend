import React from "react";
import MainComponent from "./MainComponent";
import SideBar from "./SidebarDiscover";
import Discover from "./Discover";
import { Navigate } from "react-router";
import { GetMe } from "../../hooks/redux";

const Home = () => {
  const me = GetMe();
  if (!me) return <Navigate to="/login" />;

  return (
    <div className="flex bg-[#393943] ">
      <SideBar />
      <Discover />
      <MainComponent />
    </div>
  );
};

export default Home;
