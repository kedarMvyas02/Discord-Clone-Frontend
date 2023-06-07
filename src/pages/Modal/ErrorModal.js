import React from "react";

const ErrorModal = ({ visible, onClose, heading, subHeading }) => {
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const closeHandler = () => {
    onClose();
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="z-10 bg-discord-semi600 w-full sm:w-4/6 md:w-4/6 lg:w-2/6 rounded-md p-5 m-12 flex flex-row mx-auto mt-16">
        <div className="flex flex-col w-full">
          <h4 className="text-xl text-white font-semibold text-center">
            {heading}
          </h4>
          <h6 className="text-s text-white font-light text-center">
            {subHeading}
          </h6>

          <button
            onClick={closeHandler}
            type="submit"
            className="w-full rounded p-2 mt-8 block bg-discord-experiment500 hover:bg-discord-experiment560 text-white font-semibold"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
