import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_PAGE } from "../../constants/history.constants";
import { GetMe } from "../../hooks/redux";
import classNames from "classnames";
import Not_Found from "../../assets/404_Not_Found.gif";
import Footer from "../Landing/Footer";

const NotFound = () => {
  const [open, setOpen] = useState(false);
  const me = GetMe();
  const navClass = classNames(
    "transition transform ease-linear rounded-tl-lg rounded-bl-lg z-30 duration-500 w-4/6 absolute bg-white top-0 right-0 h-screen flex flex-col justify-between",
    {
      block: open,
      hidden: !open,
    }
  );

  return (
    <>
      <div className="bg-discord-heroBackground">
        <header className=" w-full sm:w-10/12 mx-auto flex items-center justify-between px-2 sm:px-5 py-4">
          <Link to="/">
            <button type="button" className="block text-white">
              <svg
                className="fill-current w-14 h-8"
                width="124"
                height="34"
                viewBox="0 0 124 34"
              >
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
            </button>
          </Link>
          <nav className="hidden sm:block flex items-center justify-between">
            <a
              className="font-semibold text-white p-4 hover:underline"
              href="https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x86"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.com/nitro"
              className="font-semibold text-white p-4 hover:underline"
            >
              Nitro
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.com/safetycenter"
              className="font-semibold text-white p-4 hover:underline"
            >
              Safety
            </a>
            <a
              className="font-semibold text-white p-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://support.discord.com/hc/en-us"
            >
              Support
            </a>
            <a
              className="font-semibold text-white p-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.com/blog"
            >
              Blog
            </a>
            <a
              className="font-semibold text-white p-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.com/careers"
            >
              Careers
            </a>
          </nav>

          <div className="flex flex-row justify-between">
            {me ? (
              <Link
                to="/register"
                className="sm:px-4 px-2 sm:py-2 flex justify-center items-center duration-300 hover:shadow-lg hover:text-discord-indigo rounded-full bg-white text-black sm:text-sm text-xs"
                href="#"
              >
                Sign Up
              </Link>
            ) : (
              <Link
                to={LOGIN_PAGE}
                className="px-4 py-2 duration-300 hover:shadow-lg hover:text-discord-indigo rounded-full bg-white text-black text-sm"
                href="#"
              >
                Login
              </Link>
            )}

            <span
              className="text-white sm:hidden ml-4"
              onClick={() => setOpen(true)}
            >
              <svg
                className="fill-current w-10 h-10 cursor-pointer"
                viewBox="0 0 40 40"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33.3327 10H6.66602V15H33.3327V10ZM6.66602 18.3317H33.3327V23.3317H6.66602V18.3317ZM6.66602 26.665H33.3327V31.665H6.66602V26.665Z"
                ></path>
              </svg>
            </span>
          </div>
        </header>

        <nav className={navClass}>
          <div className="flex flex-row justify-between p-4">
            <svg className="w-24 h-18" viewBox="0 0 124 34">
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
            <svg
              className="h-6 w-6 cursor-pointer"
              onClick={() => setOpen(false)}
              viewBox="0 0 12 12"
            >
              <g fill="none" fillRule="evenodd" aria-hidden="true">
                <path d="M0 0h12v12H0"></path>
                <path
                  fill="currentColor"
                  d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"
                ></path>
              </g>
            </svg>
          </div>
          <ul className="list-none text-discord-notQuiteDark text-sm text-left pl-2 flex-1 space-y-2 mt-4 pt-4 mx-4 border-t-2 border-discord-offWhite">
            <li className="text-discord-textLink bg-discord-offWhite p-2 rounded-lg">
              <Link to="/" className="text-discord-textLink">
                Home
              </Link>
            </li>
            <li className="p-2 rounded-lg">
              <a
                href="https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x86"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </li>
            <li className="p-2 rounded-lg">
              <a href="#">Nitro</a>
            </li>
            <li className="p-2 rounded-lg">
              <a href="#">Safety</a>
            </li>
            <li className="p-2 rounded-lg">
              <a href="#">Blog</a>
            </li>
            <li className="p-2 rounded-lg">
              <a href="#">Careers</a>
            </li>
          </ul>

          <a
            href="https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x86"
            target="_blank"
            rel="noopener noreferrer"
            className="m-3 text-white p-1 rounded-full text-base text-center ease-linear transition duration-150 hover:shadow-lg hover:bg-discord-indigo bg-discord-experiment500"
          >
            <span className="inline-block mx-2">
              <svg className="fill-current w-4 h-4" viewBox="0 0 24 24">
                <g fill="currentColor">
                  <path d="M17.707 10.708L16.293 9.29398L13 12.587V2.00098H11V12.587L7.70697 9.29398L6.29297 10.708L12 16.415L17.707 10.708Z"></path>
                  <path d="M18 18.001V20.001H6V18.001H4V20.001C4 21.103 4.897 22.001 6 22.001H18C19.104 22.001 20 21.103 20 20.001V18.001H18Z"></path>
                </g>
              </svg>
            </span>
            Download for Windows
          </a>
        </nav>
      </div>
      {/* BODY */}
      <div>
        <div className="flex md:flex-row justify-center items-center sm:my-28 my-18 px-4">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="w-11/12 md:w-5/12 lg:w-4/12  xl:w-3/12 2xl:w-3/12  md:ml-20 ">
              <h1 className="text-left md:text-5xl text-xl text-discord-heroBackground leading-8 font-extrabold tracking-tight md:leading-13 md:mt-0 mt-8">
                WRONG TURN?
              </h1>
              <p className="mt-4 text-left md:text-lg text-base text-discord-notQuiteDark">
                You look lost, stranger. You know what helps when you’re lost? A
                piping hot bowl of noodles. Take a seat, we’re frantically at
                work here cooking up something good. Oh, you need something to
                read? These might help you:
              </p>
            </div>
            <img
              loading="lazy"
              alt=""
              src={Not_Found}
              className="pl-4 w-10/12 md:w-4/12 lg:w-5/12 xl:w-5/12 2xl:w-3/12"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
