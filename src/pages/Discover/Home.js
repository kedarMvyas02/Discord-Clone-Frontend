import React, { useState } from "react";
import MainComponent from "./MainComponent";
import SideBar from "./SidebarDiscover";
import Discover from "./Discover";
import { Navigate } from "react-router";
import { GetMe } from "../../hooks/redux";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../store/activeTabManagement";

const Home = () => {
  const [topic, setTopic] = useState("");
  const activeTab = useSelector((state) => state?.tab?.activeTab);
  const dispatch = useDispatch();
  dispatch(setActiveTab("discover"));

  const me = GetMe();
  if (!me) return <Navigate to="/login" />;

  return (
    <div className="flex bg-[#393943] ">
      <SideBar activeTab={activeTab} />
      <Discover setTopic={setTopic} />
      <MainComponent serverType={topic} />
    </div>
  );
};

export default Home;
