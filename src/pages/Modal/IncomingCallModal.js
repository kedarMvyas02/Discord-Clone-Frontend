import React from "react";

const IncomingCall = ({
  visible,
  onClose,
  callerName,
  callerImage,
  onAcceptCall,
  onRejectCall,
}) => {
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  //   const closeHandler = () => {
  //     onClose();
  //   };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="z-50 bg-discord-semi600 w-full sm:w-4/6 md:w-4/6 lg:w-2/6 rounded-md p-5 m-12 flex flex-row mx-auto mt-16">
        <div className="flex flex-col w-full">
          <h4 className="text-xl text-white font-semibold text-center flex justify-center items-center mb-8">
            {`Incoming Call from ${callerName}`}
          </h4>
          <img
            src={callerImage}
            alt={callerName}
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />

          <div className="flex">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded flex-grow-default mr-2 rounded-md"
              onClick={onAcceptCall}
            >
              Accept
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded flex-grow-default rounded-md"
              onClick={onRejectCall}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
