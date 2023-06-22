import { useAVToggle, useVideo } from "@100mslive/react-sdk";
import { GetUser } from "../../hooks/redux";

function Peer({ peer, data }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const user = GetUser();

  const { isLocalVideoEnabled } = useAVToggle();

  const showUserImage = !isLocalVideoEnabled && peer.isLocal;
  const otherUserImage = !peer.videoTrack && !peer.isLocal;

  return (
    <div className="w-[38%] h-auto p-5 m-auto">
      <div className="flex justify-center w-full">
        {showUserImage ? (
          <img
            src={user?.userImage}
            alt=""
            className="rounded-full w-16 h-16"
          />
        ) : otherUserImage ? (
          <img
            src={data?.userImage}
            alt=""
            className="rounded-full w-16 h-16"
          />
        ) : (
          <video
            className="w-[400px]"
            ref={videoRef}
            autoPlay
            muted
            playsInline
          />
        )}
      </div>
      <div className="text-sm py-4 text-center text-white">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
