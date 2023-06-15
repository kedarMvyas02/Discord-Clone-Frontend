import { useVideo } from "@100mslive/react-sdk";
import { GetUser } from "../../hooks/redux";

function ScreenShare({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const user = GetUser();

  return (
    <div className="w-[38%] h-auto p-5 m-auto">
      <div className="flex justify-end w-full">
        <video
          className="w-[400px]"
          ref={videoRef}
          autoPlay
          muted
          playsInline
        />
      </div>
      <div className="text-sm py-4 text-center text-white">
        {peer.name} {!peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default ScreenShare;
