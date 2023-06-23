import React, { useState } from "react";
import MainComponent from "./MainComponent";
import SideBar from "./SidebarDiscover";
import Discover from "./Discover";
import { Navigate } from "react-router";
import { GetMe } from "../../hooks/redux";

const Home = () => {
  const [topic, setTopic] = useState("");

  const me = GetMe();
  if (!me) return <Navigate to="/login" />;

  return (
    <div className="flex bg-[#393943] ">
      <SideBar />
      <Discover setTopic={setTopic} />
      <MainComponent serverType={topic} />
    </div>
  );
};

export default Home;
