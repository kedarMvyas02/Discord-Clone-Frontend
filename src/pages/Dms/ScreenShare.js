import {
  selectIsSomeoneScreenSharing,
  selectPeerScreenSharing,
  selectScreenShareByPeerID,
  useHMSStore,
  useScreenShare,
  useVideo,
} from "@100mslive/react-sdk";

function ScreenShare() {
  const {
    amIScreenSharing,
    screenSharingPeerName,
    screenShareAudioTrackId,
    screenShareVideoTrackId,
    screenSharingPeerId,
    toggleScreenShare,
  } = useScreenShare();
  const screenshareOn = useHMSStore(selectIsSomeoneScreenSharing);

  console.log(screenShareVideoTrackId, "jhgxsjjgjgsjfasjfasjcf");
  console.log("amIScreenSharing_asdjflak", amIScreenSharing);
  const screenSharingPeer = useHMSStore(selectPeerScreenSharing);
  console.log("screenSharingPeer_lkkajdsfkla", screenSharingPeer?.id);
  const screenSharingVideoTrack = useHMSStore(
    selectScreenShareByPeerID(screenSharingPeer?.id)
  );
  console.log("screenSharingVideoTrack_aldfjlka", screenSharingVideoTrack);

  const { videoRef } = useVideo({
    trackId: screenShareVideoTrackId,
  });

  console.log(videoRef);

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
