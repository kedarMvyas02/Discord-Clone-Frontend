import React, { useEffect } from "react";
import TextField from "../../components/TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { getAllFriends } from "../../store/dmFriends";
import { useDispatch, useSelector } from "react-redux";

const AddFriendsToServer = ({ visible, onClose, submitHandler }) => {
  const allFriends = useSelector((state) => state.dmFriends.allFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFriends());
  }, []);

  const forSubmit = (values) => {
    submitHandler(values);
  };

  const validationSchema = Yup.object().shape({
    uniqueCode: Yup.string()
      .required("Unique Code is required")
      .matches(/^\d{4}$/, "Unique Code must be a 4-digit number"),
  });

  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="z-50 bg-discord-semi600 w-full sm:w-4/6 md:w-4/6 lg:w-2/6 rounded-md p-5 m-12 flex flex-row mx-auto mt-16">
        <div className="flex flex-col w-full">
          <h4 className="text-xl text-white font-semibold text-center">
            Add friends to your server
          </h4>

          <div className="">
            {allFriends ? (
              allFriends?.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => forSubmit(data)}
                  className="select-none font-medium flex items-center text-discord-500 cursor-pointer hover:bg-discord-900 hover:bg-opacity-50 p-2 pl-0 mt-2  mx-2 rounded-md hover:text-white text-base"
                >
                  <img
                    src={data?.userImage}
                    alt=""
                    className="h-8 w-8 mx-3 rounded-2xlg mr-3"
                  />
                  {`${data?.friend}#${data?.uniqueCode}`}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 ml-auto mr-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ))
            ) : (
              <>
                <h6 className="text-l text-discord-100 font-semibold text-center mt-2">
                  You don't have any friends!
                </h6>
              </>
            )}
          </div>

          <hr className=" border-y-discord-transparentBlack1 border w-full mx-auto mt-4 mb-4" />

          <h6 className="text-s text-white font-light text-center">
            You can also add people with their unique code
          </h6>

          <Formik
            validationSchema={validationSchema}
            initialValues={{ uniqueCode: "" }}
            onSubmit={forSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex items-center mb-4"></div>
                <TextField
                  fieldClass="mb-4 mt-4"
                  labelClass="block text-discord-sideBarChannels font-semibold text-xs mb-2"
                  inputClass="focus:outline-none border-discord-transparentBlack1 border-1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white w-full rounded py-1 px-2"
                  label="UNIQUE CODE"
                  name="uniqueCode"
                  type="number"
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
                    "Add Friend to Server"
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

export default AddFriendsToServer;
