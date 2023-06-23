import React from "react";
import TextField from "../../components";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const ServerModal = ({ visible, onClose, submitHandler }) => {
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const forSubmit = (values) => {
    submitHandler(values);
    setTimeout(onClose, 2000);
  };

  const validationSchema = Yup.object().shape({
    avatarFile: Yup.mixed().required("Avatar is required"),
  });

  const CustomFileInput = ({ field, form }) => {
    const handleFileChange = (event) => {
      const file = event.currentTarget.files[0];
      form.setFieldValue(field.name, file);
    };
    return (
      <div className="relative m-auto mt-6 ">
        <input
          type="file"
          id={field.name}
          name={field.name}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="relative">
          <label
            htmlFor={field.name}
            className="w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-blue-400 cursor-pointer flex justify-center items-center"
          >
            {field.value ? (
              <img
                src={URL.createObjectURL(field.value)}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="  ml-12 mb-16 w-6 absolute">
                  <img
                    src="https://freeiconshop.com/wp-content/uploads/edd/plus-flat.png"
                    alt=""
                  />
                </div>
                <div className="absolute w-6 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    height="100%"
                    width="100%"
                    version="1.1"
                    viewBox="0 0 491.6 491.6"
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <g>
                          <path d="M245.8,351.45c-41,0-74.5-33.2-74.5-74.5c0-41,33.2-74.5,74.5-74.5c41,0,74.5,33.2,74.5,74.5S286.8,351.45,245.8,351.45z" />
                          <path d="M482.6,116.25H87.4v-33.2H33.2v33.2H9c-5.1,0-9,3.9-9,9v303.5c0,5.1,3.9,9,9,9h473.6c5.1,0,9-3.9,9-9v-303.5C491.6,120.15,487.7,116.25,482.6,116.25z M245.8,393.95c-64.4,0-117-52.7-117-117s52.7-117,117-117s117,52.7,117,117S310.2,393.95,245.8,393.95z M422.5,200.85c-13.7,0-25-11.3-25-25s11.3-25,25-25s25,11.3,25,25S436.2,200.85,422.5,200.85z" />
                          <polygon points="313.3,53.85 178.3,53.85 163.5,96.35 328.1,96.35" />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="font-semibold text-xs  absolute mt-6 text-discord-100">
                  UPLOAD
                </span>
              </>
            )}
          </label>
        </div>
      </div>
    );
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
            Create A Server!
          </h4>
          <h6 className="text-s text-white font-light text-center">
            Give your new server a personality with a name and an icon.
          </h6>
          <h6 className="text-s text-white font-light text-center">
            You can always change it later : )
          </h6>

          <Formik
            validationSchema={validationSchema}
            initialValues={{
              serverName: "",
              avatarFile: null,
              privacy: "private",
              description: "",
              serverType: "other",
            }}
            onSubmit={forSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex items-center mb-4">
                  <Field name="avatarFile" component={CustomFileInput} />
                  <ErrorMessage
                    name="avatarFile"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <TextField
                  fieldClass="mb-4 mt-4"
                  labelClass="block text-discord-sideBarChannels font-semibold text-xs mb-2"
                  inputClass="focus:outline-none border-discord-transparentBlack1 border-1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white w-full rounded py-1 px-2"
                  label="SERVER NAME"
                  name="serverName"
                  type="text"
                />
                <TextField
                  fieldClass="mb-4 mt-4"
                  labelClass="block text-discord-sideBarChannels font-semibold text-xs mb-2"
                  inputClass="focus:outline-none border-discord-transparentBlack1 border-1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white w-full rounded py-1 px-2"
                  label="DESCRIPTION"
                  name="description"
                  type="text"
                />
                <div className="flex">
                  <div className="flex-grow-default">
                    <label
                      htmlFor="privacy"
                      className="block text-discord-sideBarChannels font-semibold text-xs mr-2"
                    >
                      PRIVACY
                    </label>
                    <Field
                      as="select"
                      id="dropdown"
                      name="dropdown"
                      className="focus:outline-none border-discord-transparentBlack1 mb-4 border-1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white w-full rounded py-1 px-2"
                    >
                      <option
                        value="private"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Private
                      </option>
                      <option
                        value="public"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Public
                      </option>
                    </Field>
                  </div>

                  <div className="flex-grow-default">
                    <label
                      htmlFor="serverType"
                      className="block text-discord-sideBarChannels font-semibold text-xs mx-2"
                    >
                      SERVER TYPE
                    </label>
                    <Field
                      as="select"
                      id="dropdown"
                      name="dropdown"
                      className="focus:outline-none ml-1 border-discord-transparentBlack1 mb-4 border-1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white w-full rounded py-1 px-2"
                    >
                      <option
                        value="gaming"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Gaming
                      </option>
                      <option
                        value="music"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Music
                      </option>
                      <option
                        value="education"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Education
                      </option>
                      <option
                        value="scienceAndTech"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Science & Tech
                      </option>
                      <option
                        value="contentCreator"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Content Creator
                      </option>
                      <option
                        value="animeAndManga"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Anime & Manga
                      </option>
                      <option
                        value="moviesAndTv"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Movies & TV
                      </option>
                      <option
                        value="other"
                        className="border-discord-transparentBlack1 focus:ring-2 bg-discord-transparentBlack2 text-black font-bold"
                      >
                        Other
                      </option>
                    </Field>
                  </div>
                </div>

                <h6 className="text-xs text-white font-light text-left pt-0">
                  By creating a server, you agree to Discord's{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://discord.com/guidelines"
                    className="text-blue-500 font-bold cursor-pointer"
                  >
                    Community Guidelines
                  </a>
                </h6>

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
                    "Create server"
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

export default ServerModal;
