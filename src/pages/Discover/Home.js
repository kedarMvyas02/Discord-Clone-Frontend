import React from "react";
import MainComponent from "./MainComponent";
import SideBar from "../Dms/SideBar";
import Discover from "./Discover";

const Home = () => {
  return (
    <div className="flex bg-[#393943] ">
      <SideBar />
      <Discover />
      <MainComponent />
    </div>
  );
};

export default Home;
