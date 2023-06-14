import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import LoginSchema from "../../validation/login.schema";
import TextField from "../../components";
import { login } from "../../api/auth";
import { loginSuccess } from "../../store/user";
import LoadingCircle from "../../assets/loading_circle_icon.svg";
import LoginBg from "../../assets/login_bg.svg";
import { hideErrorModal, showErrorModal } from "../../store/error";
import ErrorModal from "../Modal/ErrorModal";

export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { visible, heading, subHeading } = useSelector(
    (state) => state.errorModal
  );

  const handleCloseErrorModal = () => {
    dispatch(hideErrorModal());
  };

  async function handleLoginSubmit(values) {
    try {
      const { data } = await login(values);
      if (data) {
        dispatch(loginSuccess(data));
        navigate("/channels/@me");
      }
    } catch (error) {
      const heading = `${error.response.data.status}`;
      const subHeading = `${error.response.data.message}`;
      dispatch(showErrorModal({ heading, subHeading }));
    }
  }

  return (
    <div className="flex flex-col relative bg-discord-semi600 h-screen w-full">
      <img
        alt=""
        src={LoginBg}
        className="z-0 hidden select-none object-cover object-center sm:block absolute top-0 bottom-0 w-full h-screen"
      />
      {/* <img
        src={loginBg}
        className='z-0 hidden object-cover object-center sm:block absolute top-0 bottom-0 w-full h-screen'
      /> */}

      <Link
        to="/"
        className="z-10 text-white mt-16 sm:self-start mx-auto sm:ml-8 sm:mt-8"
      >
        <svg className="fill-current w-14 h-8" viewBox="0 0 124 34">
          <g fill="currentColor">
            <path d="M26.0015 6.9529C24.0021 6.03845 21.8787 5.37198 19.6623 5C19.3833 5.48048 19.0733 6.13144 18.8563 6.64292C16.4989 6.30193 14.1585 6.30193 11.8336 6.64292C11.6166 6.13144 11.2911 5.48048 11.0276 5C8.79575 5.37198 6.67235 6.03845 4.6869 6.9529C0.672601 12.8736 -0.41235 18.6548 0.130124 24.3585C2.79599 26.2959 5.36889 27.4739 7.89682 28.2489C8.51679 27.4119 9.07477 26.5129 9.55525 25.5675C8.64079 25.2265 7.77283 24.808 6.93587 24.312C7.15286 24.1571 7.36986 23.9866 7.57135 23.8161C12.6241 26.1255 18.0969 26.1255 23.0876 23.8161C23.3046 23.9866 23.5061 24.1571 23.7231 24.312C22.8861 24.808 22.0182 25.2265 21.1037 25.5675C21.5842 26.5129 22.1422 27.4119 22.7621 28.2489C25.2885 27.4739 27.8769 26.2959 30.5288 24.3585C31.1952 17.7559 29.4733 12.0212 26.0015 6.9529ZM10.2527 20.8402C8.73376 20.8402 7.49382 19.4608 7.49382 17.7714C7.49382 16.082 8.70276 14.7025 10.2527 14.7025C11.7871 14.7025 13.0425 16.082 13.0115 17.7714C13.0115 19.4608 11.7871 20.8402 10.2527 20.8402ZM20.4373 20.8402C18.9183 20.8402 17.6768 19.4608 17.6768 17.7714C17.6768 16.082 18.8873 14.7025 20.4373 14.7025C21.9717 14.7025 23.2271 16.082 23.1961 17.7714C23.1961 19.4608 21.9872 20.8402 20.4373 20.8402Z"></path>
            <path d="M41.2697 9.86615H47.8585C49.4394 9.86615 50.7878 10.1141 51.8883 10.6101C52.9887 11.1061 53.8102 11.7881 54.3527 12.6715C54.8951 13.555 55.1741 14.5624 55.1741 15.7094C55.1741 16.8253 54.8952 17.8328 54.3217 18.7472C53.7482 19.6462 52.8803 20.3746 51.7178 20.9016C50.5554 21.4286 49.1139 21.6921 47.3935 21.6921H41.2697V9.86615ZM47.316 18.6852C48.3854 18.6852 49.2069 18.4217 49.7804 17.8793C50.3539 17.3523 50.6484 16.6083 50.6484 15.6939C50.6484 14.8414 50.3849 14.1594 49.8734 13.648C49.3619 13.1365 48.587 12.873 47.5485 12.873H45.4871V18.6852H47.316Z"></path>
            <path d="M65.4362 21.6774C64.5217 21.4449 63.7003 21.1039 62.9718 20.6389V17.8335C63.5298 18.2675 64.2582 18.6085 65.1882 18.8875C66.1181 19.1665 67.0171 19.306 67.8851 19.306C68.288 19.306 68.598 19.2595 68.7995 19.151C69.001 19.0425 69.1095 18.9185 69.1095 18.7635C69.1095 18.593 69.0475 18.4535 68.939 18.345C68.8305 18.2365 68.6135 18.1435 68.288 18.0505L66.2576 17.6011C65.0952 17.3376 64.2737 16.9501 63.7777 16.4851C63.2818 16.0201 63.0493 15.3847 63.0493 14.6097C63.0493 13.9587 63.2663 13.3853 63.6847 12.9048C64.1187 12.4243 64.7232 12.0523 65.5137 11.7888C66.3041 11.5254 67.2186 11.3859 68.288 11.3859C69.2335 11.3859 70.1014 11.4789 70.8919 11.6959C71.6823 11.8973 72.3333 12.1608 72.8448 12.4708V15.1212C72.3178 14.8112 71.6979 14.5632 71.0159 14.3772C70.3184 14.1912 69.6055 14.0982 68.877 14.0982C67.823 14.0982 67.2961 14.2842 67.2961 14.6407C67.2961 14.8112 67.3736 14.9352 67.5441 15.0282C67.7146 15.1212 68.009 15.1987 68.443 15.2917L70.1324 15.6017C71.2329 15.7876 72.0543 16.1286 72.5968 16.6091C73.1393 17.0896 73.4028 17.787 73.4028 18.7325C73.4028 19.7555 72.9533 20.5769 72.0543 21.1659C71.1554 21.7704 69.8844 22.0648 68.2415 22.0648C67.2806 22.0338 66.3506 21.9098 65.4362 21.6774Z"></path>
            <path d="M77.5891 21.3213C76.6281 20.8408 75.8842 20.2054 75.4037 19.3994C74.9077 18.5934 74.6752 17.679 74.6752 16.656C74.6752 15.6486 74.9232 14.7341 75.4347 13.9437C75.9462 13.1377 76.6901 12.5177 77.6666 12.0528C78.643 11.6033 79.821 11.3708 81.1849 11.3708C82.8743 11.3708 84.2693 11.7273 85.3852 12.4402V15.5246C84.9977 15.2611 84.5328 15.0286 84.0058 14.8736C83.4788 14.7031 82.9208 14.6256 82.3319 14.6256C81.2779 14.6256 80.472 14.8116 79.8675 15.1991C79.2785 15.5866 78.984 16.0826 78.984 16.7025C78.984 17.307 79.263 17.803 79.852 18.1905C80.4254 18.5779 81.2624 18.7794 82.3474 18.7794C82.9053 18.7794 83.4633 18.7019 84.0058 18.5314C84.5483 18.3609 85.0287 18.175 85.4162 17.927V20.9183C84.1762 21.6623 82.7348 22.0343 81.1074 22.0343C79.728 22.0343 78.5655 21.7863 77.5891 21.3213Z"></path>
            <path d="M89.8041 21.3213C88.8276 20.8408 88.0837 20.2054 87.5722 19.3839C87.0607 18.5624 86.7972 17.648 86.7972 16.625C86.7972 15.6176 87.0607 14.7031 87.5722 13.9127C88.0837 13.1222 88.8276 12.5022 89.7886 12.0528C90.7495 11.6033 91.9119 11.3708 93.2464 11.3708C94.5794 11.3708 95.7418 11.5878 96.7028 12.0528C97.6637 12.5022 98.4077 13.1222 98.9192 13.9127C99.4306 14.7031 99.6786 15.6021 99.6786 16.625C99.6786 17.6325 99.4306 18.5624 98.9192 19.3839C98.4077 20.2054 97.6792 20.8563 96.7028 21.3213C95.7263 21.7863 94.5794 22.0343 93.2464 22.0343C91.9274 22.0343 90.7805 21.7863 89.8041 21.3213ZM94.9358 18.3299C95.3388 17.927 95.5558 17.369 95.5558 16.7025C95.5558 16.0206 95.3543 15.4936 94.9358 15.0906C94.5174 14.6876 93.9594 14.4861 93.2619 14.4861C92.5335 14.4861 91.9739 14.6876 91.5555 15.0906C91.1525 15.4936 90.9355 16.0206 90.9355 16.7025C90.9355 17.3845 91.137 17.927 91.5555 18.3299C91.9739 18.7484 92.5335 18.9499 93.2619 18.9499C93.9594 18.9344 94.5329 18.7329 94.9358 18.3299Z"></path>
            <path d="M110.048 11.9901V15.6325C109.614 15.3535 109.056 15.214 108.374 15.214C107.475 15.214 106.777 15.493 106.297 16.0354C105.816 16.5779 105.568 17.4304 105.568 18.5773V21.6772H101.43V11.8196H105.491V14.966C105.708 13.819 106.08 12.9666 106.576 12.4241C107.072 11.8816 107.723 11.5872 108.513 11.5872C109.102 11.5872 109.614 11.7267 110.048 11.9901Z"></path>
            <path d="M124 9.52563V21.6925H119.862V19.4761C119.505 20.3131 118.978 20.9486 118.265 21.3825C117.551 21.8165 116.667 22.0335 115.613 22.0335C114.683 22.0335 113.862 21.801 113.164 21.3515C112.467 20.9021 111.925 20.2666 111.553 19.4761C111.181 18.6702 110.995 17.7712 110.995 16.7793C110.979 15.7408 111.181 14.8109 111.599 13.9894C112.002 13.168 112.591 12.5325 113.335 12.0675C114.079 11.6025 114.931 11.37 115.892 11.37C117.861 11.37 119.18 12.2225 119.862 13.9429V9.52563H124ZM119.242 18.2517C119.66 17.8487 119.877 17.3062 119.877 16.6553C119.877 16.0198 119.676 15.5083 119.257 15.1209C118.839 14.7334 118.281 14.5319 117.582 14.5319C116.884 14.5319 116.326 14.7334 115.908 15.1364C115.489 15.5393 115.288 16.0508 115.288 16.7018C115.288 17.3527 115.489 17.8642 115.908 18.2672C116.326 18.6702 116.869 18.8717 117.566 18.8717C118.265 18.8717 118.823 18.6702 119.242 18.2517Z"></path>
            <path d="M58.9885 12.4091C60.1772 12.4091 61.1429 11.5416 61.1429 10.4717C61.1429 9.40164 60.1772 8.5343 58.9885 8.5343C57.7981 8.5343 56.8341 9.40164 56.8341 10.4717C56.8341 11.5416 57.7981 12.4091 58.9885 12.4091Z"></path>
            <path d="M61.1429 13.741C59.8254 14.3144 58.1825 14.3299 56.8341 13.741V21.6921H61.1429V13.741Z"></path>
          </g>
        </svg>
      </Link>

      <div className="z-10 bg-discord-semi600 w-full sm:w-3/6 md:w-3/6 lg:w-3/6 xl:w-2/6 rounded-md p-5 m-12 flex flex-row mx-auto mt-16">
        <div className="flex flex-col w-full md:2/5">
          <h4 className="text-xl text-white font-semibold">Welcome back!</h4>
          <p className="text-sm text-discord-mainText">
            We're so excited to see you again!
          </p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextField
                  fieldClass="mb-4 mt-4"
                  labelClass="block text-discord-500 font-semibold text-xs mb-2"
                  inputClass="focus:outline-none border-discord-transparentBlack1 border-1
                   focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white
                    w-full rounded py-1 px-2"
                  label="EMAIL"
                  name="email"
                  type="email"
                />
                <TextField
                  fieldClass="mb-4 mt-4"
                  labelClass="block text-discord-500 font-semibold text-xs mb-2"
                  inputClass="focus:outline-none border-discord-transparentBlack1 border-1
                   focus:ring-2 focus:ring-blue-400 bg-discord-transparentBlack2 text-white
                    w-full rounded py-1 px-2"
                  label="PASSWORD"
                  name="password"
                  type="password"
                />
                <Link
                  to="/forgotPassword"
                  className="text-xs text-discord-textLink hover:underline"
                >
                  Forgot your password?
                </Link>

                <button
                  type="submit"
                  className="transition-colors duration-300 focus:outline-none w-full rounded p-2 mt-8 block bg-discord-experiment500 hover:bg-discord-experiment500Disabled text-white font-semibold"
                >
                  {isSubmitting ? (
                    <img
                      alt=""
                      src={LoadingCircle}
                      className="animate-spin h-5 w-5 text-white mx-auto"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-2">
            <span className="text-xs text-discord-popOutHeader mr-2">
              Need an account?
            </span>
            <Link
              to="/register"
              className="text-xs text-discord-textLink hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      <ErrorModal
        visible={visible}
        onClose={handleCloseErrorModal}
        heading={heading}
        subHeading={subHeading}
      />
    </div>
  );
}

/*
import QrCode from "../../assets/qr_code.png";

<div className="flex flex-col justify-center items-center p-2 hidden lg:block mx-auto ">
          <img
            src={QrCode}
            className="w-40 h-40 mt-10 mx-auto rounded-md border-white border-8"
            alt="QR code to login"
          />
          <h3 className="text-white text-2xl bold mt-4 text-center">
            Log in with QR Code
          </h3>
          <p className="text-discord-mainText mt-4 w-64 text-center mt-">
            Scan this with the <strong>Discord mobile app </strong>
            to log in instantly.
          </p>
        </div>
 */
