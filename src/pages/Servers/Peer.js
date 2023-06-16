import { useAVToggle, useVideo } from "@100mslive/react-sdk";
import { GetUser } from "../../hooks/redux";

function Peer({ peer, data }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const user = GetUser();

  const { isLocalVideoEnabled } = useAVToggle();

  return (
    <div className="w-[38%] h-auto p-5 m-auto">
      <div className="flex justify-end w-full">
        {isLocalVideoEnabled ? (
          <video
            className="w-[400px]"
            ref={videoRef}
            autoPlay
            muted
            playsInline
          />
        ) : peer.isLocal ? (
          <img
            src={user?.userImage}
            alt=""
            className="rounded-full mr-4  w-16 h-16 "
          />
        ) : (
          <img
            src={data?.userImage}
            alt=""
            className="rounded-full mr-4  w-16 h-16 "
          />
        )}
      </div>
      <div className="text-sm py-4 text-center text-white">
        {peer.name} {!peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
