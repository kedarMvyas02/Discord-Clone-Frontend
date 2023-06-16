import React from "react";
import { useScreenShare } from "@100mslive/react-sdk";

const ScreenShareComponent = () => {
  const { videoRef, isScreenSharing, startScreenShare, stopScreenShare } =
    useScreenShare();

  return (
    <div>
      {isScreenSharing ? (
        <div>
          <h3>Screen is being shared</h3>
          <button onClick={stopScreenShare}>Stop Sharing</button>
          <video ref={videoRef} autoPlay playsInline />
        </div>
      ) : (
        <div>
          <h3>Screen Share</h3>
          <button onClick={startScreenShare}>Share Screen</button>
        </div>
      )}
    </div>
  );
};

export default ScreenShareComponent;
