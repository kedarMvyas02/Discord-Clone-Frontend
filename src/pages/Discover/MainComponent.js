import React, { useEffect, useState } from "react";
import Featured from "./Featured";
import Hero from "./Hero";
import client from "../../api/client";

const MainComponent = ({ serverType }) => {
  const [servers, setServers] = useState(null);
  const [value, setValue] = useState("");
  console.log(serverType);

  useEffect(() => {
    const fetchPublicServers = async () => {
      try {
        const res = await client.get(
          `server/searchServers?name=${value}&serverType=${serverType}`
        );
        setServers(res?.data?.servers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublicServers();
  }, [value, serverType]);

  return (
    <div className="bg-[#393943] w-full px-5 pt-4">
      <Hero setValue={setValue} />
      <Featured servers={servers} />
    </div>
  );
};

export default MainComponent;
