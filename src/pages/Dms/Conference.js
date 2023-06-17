import {
  selectPeerScreenSharing,
  selectPeers,
  useHMSStore,
  useScreenShare,
} from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";

function Conference({ data }) {
  const peers = useHMSStore(selectPeers);
  // const screensharingPeer = useHMSStore(selectPeerScreenSharing)
  

  console.log(peers);

  return (
    <div class="flex justify-between items-center">
      {peers?.map((peer) => (
        <Peer data={data} key={peer.id} peer={peer} />
      ))}
    </div>
  );
}

export default Conference;
