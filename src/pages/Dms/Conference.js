import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";

function Conference() {
  const peers = useHMSStore(selectPeers);
  return (
    <div class="flex justify-between items-center">
      {peers.map((peer) => (
        <Peer key={peer.id} peer={peer} />
      ))}
    </div>
  );
}

export default Conference;
