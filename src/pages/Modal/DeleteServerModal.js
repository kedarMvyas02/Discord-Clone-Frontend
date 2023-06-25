import React from "react";

const Delete = ({ visible, onClose, submitHandler }) => {
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const forSubmit = (values) => {
    submitHandler(values);
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="z-50 bg-discord-semi600 w-full sm:w-4/6 md:w-4/6 lg:w-2/6 rounded-md p-5 m-12 flex flex-row mx-auto mt-16">
        <div className="flex flex-col w-full">
          <h4 className="text-xl text-white font-semibold text-center">
            Delete Your Server?
          </h4>
          <h6 className="text-sm text-white font-semibold text-center">
            do you hate wumpus..(wumpus will still miss you)
          </h6>
          <div className="flex mt-6">
            <div
              onClick={forSubmit}
              className="bg-transparent border-1 border-red-700 hover:bg-red-700 cursor-pointer text-discord-mainTextHover hover:text-discord-mainTextHover p-1 m-1 rounded-md flex-grow-default flex justify-center items-center"
            >
              Delete Server
            </div>

            <div
              onClick={() => onClose()}
              className="bg-discord-indigo cursor-pointer hover:text-discord-mainTextHover p-1 m-1 rounded-md flex-grow-default flex justify-center items-center"
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
