import React from "react";
import TextField from "../../components";
import { Form, Formik } from "formik";

const ChannelModal = ({ visible, onClose, channelName, submitHandler }) => {
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const forSubmit = (values) => {
    submitHandler(values);
    setTimeout(onClose, 2000);
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
            Create {channelName}
          </h4>
          <Formik initialValues={{ channelName: "" }} onSubmit={forSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <TextField
                  fieldClass="mb-4 mt-4"
                  labelClass="block text-discord-sideBarChannels font-semibold text-xs mb-2"
                  inputClass="focus:outline-none border-discord-transparentBlack1 border-1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white w-full rounded py-1 px-2"
                  label={channelName}
                  name="channelName"
                  type="text"
                />

                <button
                  type="submit"
                  className="w-full rounded p-2 mt-8 block bg-discord-experiment500 hover:bg-discord-experiment560 text-white font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Create channel"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChannelModal;
