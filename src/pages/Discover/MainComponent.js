import React, { useEffect, useState } from "react";
import Featured from "./Featured";
import Hero from "./Hero";
import client from "../../api/client";

const MainComponent = () => {
  const [servers, setServers] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchPublicServers = async () => {
      try {
        const res = await client.get(`server/searchServers?name=${value}`);
        console.log(res?.data);
        setServers(res?.data?.servers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublicServers();
  }, [value]);

  return (
    <div className="bg-[#393943] w-full px-5 pt-4">
      <Hero setValue={setValue} />
      <Featured servers={servers} />
    </div>
  );
};

export default MainComponent;
