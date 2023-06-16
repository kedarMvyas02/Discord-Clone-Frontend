import {
  selectPeers,
  selectPeersScreenSharing,
  useHMSStore,
} from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";

function Conference({ data }) {
  const peers = useHMSStore(selectPeers);

  return (
    <div class="flex justify-between items-center">
      {peers?.map((peer) => (
        <Peer data={data} key={peer.id} peer={peer} />
      ))}
    </div>
  );
}

export default Conference;
