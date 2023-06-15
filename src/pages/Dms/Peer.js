import { useVideo } from "@100mslive/react-sdk";

function Peer({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <div className="w-[38%] h-auto p-5 m-auto">
      <div className="flex justify-end w-full">
        <video
          className="w-[400px]"
          ref={videoRef}
          // className={`peer-video ${peer.isLocal ? "local" : ""}`}
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

export default Peer;
