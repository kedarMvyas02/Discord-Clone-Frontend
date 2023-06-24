import React, { useState, useRef } from "react";
import { GetUser } from "../../hooks/redux";
import { useNavigate } from "react-router";
import ErrorModal from "../Modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorModal, showErrorModal } from "../../store/error";
import DeleteUserModal from "../Modal/DeleteUserModal";
import client from "../../api/client";
import UpdateModal from "../Modal/UpdateModal";

const Account = ({ server }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [detail, setDetail] = useState({
    toggle: false,
    name: "",
  });

  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );

  const deleteAccountHandler = () => {
    const heading = `Are you sure, you want to delete this account?`;
    const subHeading = `This action is irreversible, you won't be able to recover your account again`;
    dispatch(showErrorModal({ heading, subHeading }));
  };
  const deleteUserAccountFinal = async (values) => {
    await client.post("/users/deleteUser", {
      email: user?.email,
      password: values?.password,
    });
    navigate("/login");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = GetUser();

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
  const showUpdateModal = (data) => {
    if (data.email) {
      setDetail((prevState) => {
        return {
          ...prevState,
          name: "email",
          toggle: true,
        };
      });
    } else {
      setDetail((prevState) => {
        return {
          ...prevState,
          name: "username",
          toggle: true,
        };
      });
    }
  };
  const updateHandler = (data) => {
    // TODO
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
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-blue-400 cursor-pointer flex justify-center items-center"
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
    <div className="flex flex-col mt-0">
      <span className="text-discord-500 mb-0 mt-2">Upload Photo</span>
      <div className="mt-0 flex justify-start items-start">
        <CustomFileInput field="serverImage" />
        <span className="text-discord-500 text-xs ml-4 mb-0 mt-12">
          We recommend an image of <br /> atleast 512x512 for the server
        </span>
        <div>
          <div className="flex items-center ml-4">
            <p className="text-xs text-discord-mainText font-semibold">
              SERVER NAME
            </p>
          </div>
          <div className="flex">
            <div className="border-discord-transparentBlack1 focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white w-full rounded py-1 px-2 mt-8 ml-3 cursor-default">
              {server?.name}
            </div>
            <div className="mt-8 ml-2 text-black bg-gray-500">Edit</div>
          </div>
        </div>
      </div>
      <hr className=" border-y-discord-600 border w-full mx-auto mt-12" />
      <div>
        <div className="flex items-center ml-4">
          <p className="text-discord-500 text-medium font-semibold text-xl mt-12">
            Password And Authentication
          </p>
        </div>
        <button
          onClick={() => navigate("/forgotPassword")}
          className="bg-discord-indigo px-3 py-1 mt-10 ml-4 text-white text-sm rounded-md"
        >
          Change Password
        </button>

        <hr className=" border-y-discord-600 border w-full mx-auto mt-12" />

        <div className="flex items-center ml-4">
          <p className="text-discord-500 text-medium font-semibold text-xl mt-12">
            Account Removal
          </p>
        </div>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-[44px] ml-4 text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>

          <button
            onClick={deleteAccountHandler}
            className="bg-transparent border-1 border-red-700 hover:bg-red-700 px-4 py-1 mt-10 ml-2 text-white text-sm rounded-md"
          >
            Delete Account
          </button>
        </div>
      </div>
      <DeleteUserModal
        visible={showDelete}
        onClose={handleCloseDeleteModal}
        submitHandler={deleteUserAccountFinal}
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
    </div>
  );
};

export default Account;
