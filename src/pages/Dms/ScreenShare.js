import {
  selectIsSomeoneScreenSharing,
  useHMSStore,
  useScreenShare,
  useVideo,
} from "@100mslive/react-sdk";

function ScreenShare() {
  const { screenShareVideoTrackId } = useScreenShare();
  const screenshareOn = useHMSStore(selectIsSomeoneScreenSharing);

  const { videoRef } = useVideo({
    trackId: screenShareVideoTrackId,
  });

  return (
    <div className="w-[100%] h-80 p-5 m-auto">
      <div className="flex justify-end w-full">
        {screenshareOn && (
          <video
            className="w-[600px]"
            ref={videoRef}
            autoPlay
            muted
            playsInline
          />
        )}
      </div>
    </div>
  );
}

export default ScreenShare;
