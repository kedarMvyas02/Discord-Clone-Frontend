import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import ErrorModal from "../Modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorModal, showErrorModal } from "../../store/error";
import client from "../../api/client";
import UpdateModal from "../Modal/UpdateModal";
import DeleteServerModal from "../Modal/DeleteServerModal";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { getServer } from "../../store/server";

const Account = ({ server }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [detail, setDetail] = useState({
    toggle: false,
    _id: "",
    name: "",
    deleteToggle: false,
    deleteHeading: "",
    deleteSubHeading: "",
    deleteData: "",
  });
  const { id } = useParams();

  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );

  const deleteAccountHandler = () => {
    const heading = `Are you sure, you want to delete this server?`;
    const subHeading = `This action is irreversible, you won't be able to recover this server again`;
    dispatch(showErrorModal({ heading, subHeading }));
  };

  const deleteServerAccountFinal = async () => {
    try {
      await client.post(`/server/deleteServer/${id}`);
      navigate("/discover");
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = GetUser();

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
    setShowDelete(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDelete(false);
    setDetail((prevState) => {
      return {
        ...prevState,
        toggle: false,
      };
    });
  };

  const handleCloseConfirmModal = () => {
    setDetail((prevState) => {
      return {
        ...prevState,
        deleteToggle: false,
      };
    });
  };

  const showUpdateModal = (data) => {
    if (data.serverName) {
      setDetail((prevState) => {
        return {
          ...prevState,
          name: "serverName",
          toggle: true,
        };
      });
    } else if (data.textChannel) {
      setDetail((prevState) => {
        return {
          ...prevState,
          name: "textChannel",
          _id: data?.textChannel?._id,
          toggle: true,
        };
      });
    } else {
      setDetail((prevState) => {
        return {
          ...prevState,
          name: "voiceChannel",
          _id: data?.voiceChannel?._id,
          toggle: true,
        };
      });
    }
  };

  const showDeleteModal = (data) => {
    if (data.textDelete) {
      const heading = `Are you sure you want to delete this text channel?? `;
      const subHeading = `These action is irreversible, make sure!`;
      setDetail((prevState) => {
        return {
          ...prevState,
          deleteToggle: true,
          deleteHeading: heading,
          deleteSubHeading: subHeading,
          _id: data?.textDelete?._id,
          deleteData: { data: data?.textDelete, name: "textDelete" },
        };
      });
    } else {
      const heading = `Are you sure you want to delete this voice channel?? `;
      const subHeading = `These action is irreversible, make sure!`;
      setDetail((prevState) => {
        return {
          ...prevState,
          deleteToggle: true,
          deleteHeading: heading,
          deleteSubHeading: subHeading,
          _id: data?.voiceDelete?._id,
          deleteData: { data: data?.voiceDelete, name: "voiceDelete" },
        };
      });
    }
  };

  const updateHandler = async (data) => {
    try {
      if (data?.serverName) {
        await client.post(`/server/updateServer/${id}`, {
          name: data?.serverName,
        });
        dispatch(getServer(id));
      } else if (data?.textChannel) {
        await client.post(`/server/updateTextChannel/${detail._id}`, {
          name: data?.textChannel,
        });
        dispatch(getServer(id));
      } else {
        await client.post(`/server/updateVoiceChannel/${detail._id}`, {
          name: data?.voiceChannel,
        });
        dispatch(getServer(id));
      }
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  };

  const confirmationHandler = async () => {
    try {
      if (detail?.deleteData?.name === "textDelete") {
        await client.post(`/server/deleteTextChannel/${detail._id}`);
        dispatch(getServer(id));
      } else {
        await client.post(`/server/deleteVoiceChannel/${detail._id}`);
        dispatch(getServer(id));
      }
    } catch (error) {
      const heading = `${error?.response?.data?.status}`;
      const subHeading = `${error?.response?.data?.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
    handleCloseConfirmModal();
  };

  const CustomFileInput = ({ field }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
      const file = event.currentTarget.files[0];
      setSelectedFile(file);
    };

    const handleClick = () => {
      fileInputRef.current.click();
    };

    return (
      <div className="flex justify-start items-start mt-6">
        <input
          type="file"
          id={field.name}
          name={field.name}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className="flex justify-start">
          <label
            htmlFor={field.name}
            className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-blue-400 cursor-pointer flex justify-center items-center"
            onClick={handleClick}
          >
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img src={server?.avatar} alt="" />
              </>
            )}
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col mt-0 h-screen">
      <span className="text-discord-500 mb-0 mt-2">Upload Photo</span>
      <div className="mt-0 flex justify-start items-start">
        <CustomFileInput field="serverImage" />
        <span className="text-discord-500 text-xl ml-4 mb-0 mt-[56px]">
          We recommend an image of <br /> atleast 512x512 for the server
        </span>
        <div>
          <div className="flex items-center ml-10 mt-6">
            <p className="text-xs text-discord-mainText font-semibold">
              SERVER NAME
            </p>
          </div>
          <div className="flex">
            <div className="border-discord-transparentBlack1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white w-full rounded pl-2 py-3 pr-40 mt-5 ml-10 cursor-default">
              {server?.name}
            </div>
            <button
              onClick={() => showUpdateModal({ serverName: server?.name })}
              className="bg-discord-grayDeep text-white h-10 w-24 mt-[26px] ml-10 rounded text-sm text-center"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <hr className=" border-y-discord-600 border w-full mx-auto mt-12" />
      <div>
        <div className="flex items-center ml-4 mt-6">
          <p className="text-xs text-discord-mainText font-semibold">
            Text Channels
          </p>
        </div>
        {server?.textChannels?.map((text) => (
          <div className="flex">
            <div className="border-discord-transparentBlack1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 flex text-white w-full rounded pl-2 py-3 pr-40 mt-5 ml-3 cursor-default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-5 mt-1"
              >
                <path
                  fillRule="evenodd"
                  d="M11.097 1.515a.75.75 0 01.589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 111.47.294L16.665 7.5h3.585a.75.75 0 010 1.5h-3.885l-1.2 6h3.585a.75.75 0 010 1.5h-3.885l-1.08 5.397a.75.75 0 11-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 01-1.47-.294l1.02-5.103H3.75a.75.75 0 110-1.5h3.885l1.2-6H5.25a.75.75 0 010-1.5h3.885l1.08-5.397a.75.75 0 01.882-.588zM10.365 9l-1.2 6h4.47l1.2-6h-4.47z"
                  clipRule="evenodd"
                />
              </svg>
              {text?.name}
            </div>
            <button
              onClick={() => showUpdateModal({ textChannel: text })}
              className="bg-discord-grayDeep text-white h-10 w-24 mt-[26px] ml-10 cursor-pointer rounded text-sm text-center"
            >
              Edit
            </button>
            <button
              onClick={() => showDeleteModal({ textDelete: text })}
              className="bg-discord-red hover:bg-discord-red2Hover cursor-pointer text-white h-10 w-24 mt-[26px] ml-4 rounded text-sm text-center"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center ml-4 mt-6">
          <p className="text-xs text-discord-mainText font-semibold">
            Voice Channels
          </p>
        </div>
        {server?.voiceChannels?.map((voice) => (
          <div className="flex">
            <div className="border-discord-transparentBlack1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 flex text-white w-full rounded pl-2 py-3 pr-40 mt-5 ml-3 cursor-default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-5 mt-1 mr-1"
              >
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
              </svg>
              {voice?.name}
            </div>
            <button
              onClick={() => showUpdateModal({ voiceChannel: voice })}
              className="bg-discord-grayDeep text-white h-10 w-24 mt-[26px] ml-10 cursor-pointer rounded text-sm text-center"
            >
              Edit
            </button>
            <button
              onClick={() => showDeleteModal({ voiceDelete: voice })}
              className="bg-discord-red hover:bg-discord-red2Hover cursor-pointer text-white h-10 w-24 mt-[26px] ml-4 rounded text-sm text-center"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <hr className=" border-y-discord-600 border w-full mx-auto mt-12" />
      <div className="flex items-center ml-4">
        <p className="text-discord-500 text-medium font-semibold text-xl mt-12">
          Delete Server
        </p>
        <div className="flex ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-[48px] mr-4 text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>

          <button
            onClick={deleteAccountHandler}
            className="bg-transparent border-1 border-red-700 hover:bg-red-700 px-4 py-1 mt-10 text-white text-xm rounded-md"
          >
            Delete Server
          </button>
        </div>
      </div>
      <DeleteServerModal
        visible={showDelete}
        onClose={handleCloseDeleteModal}
        submitHandler={deleteServerAccountFinal}
      />
      <ErrorModal
        visible={visible}
        onClose={handleCloseErrorModal}
        heading={heading}
        subHeading={subHeading}
      />
      <UpdateModal
        name={detail.name}
        visible={detail.toggle}
        onClose={handleCloseDeleteModal}
        submitHandler={updateHandler}
      />
      <ConfirmationModal
        visible={detail.deleteToggle}
        onClose={handleCloseConfirmModal}
        submitHandler={confirmationHandler}
        heading={detail.deleteHeading}
        subHeading={detail.deleteSubHeading}
      />
    </div>
  );
};

export default Account;
