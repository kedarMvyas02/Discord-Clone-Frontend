import {
  selectPeers,
  selectPeersScreenSharing,
  useHMSStore,
} from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";
import ScreenShare from "./ScreenShare";

function Conference({ data }) {
  const peers = useHMSStore(selectPeers);
  console.log(peers);
  const shares = useHMSStore(selectPeersScreenSharing);
  console.log(shares);

  return (
    <div class="flex justify-between items-center">
      {peers?.map((peer) => (
        <Peer data={data} key={peer.id} peer={peer} />
      ))}
      {shares?.map((share) => (
        <ScreenShare data={data} key={share.id} share={share} />
      ))}
    </div>
  );
}

export default Conference;
