import React, { useState } from "react";
import { GetUser } from "../../hooks/redux";
import { useNavigate } from "react-router";
import ErrorModal from "../Modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorModal, showErrorModal } from "../../store/error";
import DeleteUserModal from "../Modal/DeleteUserModal";
import client from "../../api/client";
import UpdateModal from "../Modal/UpdateModal";

const Account = () => {
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
    console.log(data);
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

  return (
    <div className="flex flex-col mt-2">
      <div className="w-full flex flex-col mx-4 mx-auto">
        <div className={`w-full bg-discord-indigo h-20 relative rounded-t-lg`}>
          <div className="flex items-center absolute bottom-0 left-0 -mb-16 ml-4">
            <div className="relative flex justify-center">
              <div
                className={`relative flex items-center mx-auto w-20 h-20 bg-discord-indigo text-white rounded-full inline-block p-2 border-6 border-discord-900`}
              >
                <img src={user?.userImage} alt="" className="rounded-full" />
              </div>
              <span className="bg-discord-green w-6 h-6 rounded-full absolute right-0 bottom-0 border-6 border-discord-900 -mr-1 mb-2"></span>
            </div>
            <div className="flex items-center ml-4">
              <p className="text-white text-medium font-bold text-xl">
                {user?.name}{" "}
              </p>
              <p className="text-discord-mainText text-medium text-xm ml-1 mt-1">
                #{user?.uniqueCode}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col bg-discord-900 p-4">
          {/* <button className="self-end w-24 bg-discord-experiment500 text-white p-1 rounded-md text-xs text-center hover:bg-discord-experiment500Disabled">
          Edit Profile
        </button> */}
          <div className="p-4 flex flex-col mt-8  bg-gray-700 rounded-lg">
            <div className="flex justify-between mt-2">
              <div className="flex flex-col">
                <span className="text-xxs text-discord-mainText font-semibold">
                  USERNAME
                </span>
                <h6 className="text-white text-xm">
                  {user?.name}{" "}
                  <span className="text-discord-mainText text-xs">
                    #{user?.uniqueCode}
                  </span>
                </h6>
              </div>
              <button
                onClick={() => showUpdateModal({ name: user?.name })}
                className="bg-discord-grayDeep text-white p-1 px-4 rounded text-sm text-center"
              >
                Edit
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <div className="flex flex-col">
                <span className="text-xxs text-discord-mainText font-semibold">
                  EMAIL
                </span>
                <h6 className="text-white text-xm">{user?.email}</h6>
              </div>
              <button
                onClick={() => showUpdateModal({ email: user?.email })}
                className="bg-discord-grayDeep text-white p-1 px-4 rounded text-sm text-center"
              >
                Edit
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <div className="flex flex-col">
                <span className="text-xxs text-discord-mainText font-semibold">
                  PHONE NUMBER
                </span>
                <h6 className="text-white text-xm">
                  You haven't added a phone number yet.
                </h6>
              </div>
              <button className="bg-discord-grayDeep text-white p-1 px-4 rounded text-sm text-center">
                Add
              </button>
            </div>
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
