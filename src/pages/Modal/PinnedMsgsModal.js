import React, { useState } from "react";
import Message from "../Dms/Message";

const PinnedMsgsModal = ({ visible, onClose }) => {
  const [msgs, setMsgs] = useState("");
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-opacity-25 flex justify-center items-center"
    >
      <div className="z-10 bg-discord-semi600 w-full sm:w-4/6 md:w-4/6 lg:w-2/6 rounded-md p-5 m-12 flex flex-row mx-auto mt-16">
        <div className="flex flex-col w-full bg-black bg-opacity-25">
          <h4 className="text-xl flex  p-4 text-white font-semibold text-center pt-6 bg-black bg-opacity-50">
            Pinned Messages
          </h4>
          {/* {!msgs ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" height="120" width="94">
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="m91.11725 73.1472903c0 24.5560774-19.94925 44.4624257-44.559 44.4624257-24.609 0-44.55825-19.9063483-44.55825-44.4624257s19.94925-44.4631742 44.55825-44.4631742c24.60975 0 44.559 19.9070968 44.559 44.4631742"
                    fill="#424549"
                  />
                  <path
                    d="m80.185775 43.9741135c6.8085 7.8079226 10.93125 18.0099355 10.93125 29.1728775 0 24.5560774-19.94925 44.463174-44.55825 44.463174s-44.559-19.9070966-44.559-44.463174c0-24.5560775 19.95-44.4624258 44.559-44.4624258"
                    stroke="#222426"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                  <path
                    d="m24.279275 74.9720077c0 3.0698839-2.49375 5.5575226-5.5695 5.5575226-3.0765 0-5.57025-2.4876387-5.57025-5.5575226 0-3.0698838 2.49375-5.5575225 5.57025-5.5575225 3.07575 0 5.5695 2.4876387 5.5695 5.5575225m55.6983 0c0 3.0698839-2.49375 5.5575226-5.5695 5.5575226-3.0765 0-5.57025-2.4876387-5.57025-5.5575226 0-3.0698838 2.49375-5.5575225 5.57025-5.5575225 3.07575 0 5.5695 2.4876387 5.5695 5.5575225"
                    fill="#222426"
                  />
                  <path
                    d="m57.6983 94.8037419c-6.513-5.1990451-15.7665-5.1990451-22.2795 0"
                    stroke="#222426"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                  <g fill="#3b3e42">
                    <path d="m63.522875 34.4979613-14.77575 11.9352774c-.9255.7483871-2.145-.4684903-1.39575-1.392l5.26425-6.4892645 6.6975-8.2547097m26.1864-17.980449 6.09075 6.0776516c.387.3861677.387 1.0133161 0 1.4002323l-1.404 1.4002322c-1.5495 1.5469161-4.06275 1.5469161-5.613 0l-11.92875-11.90309676c-1.55025-1.54691613-1.55025-4.0547613 0-5.60092903l1.40325-1.40023223c.38775-.38691613 1.01625-.38691613 1.404 0l3.64125 3.63341935" />
                    <path d="m66.284075 37.2532232-14.3385-14.3076645c-.38775-.3869161-.38775-1.0140645 0-1.4009806l1.05225-1.0499871c3.1005-3.0938323 8.12625-3.0938323 11.22675 0l9.1215 9.1018838c3.1005 3.0938323 3.1005 8.1095226 0 11.2033549l-1.05225 1.0499871c-.38775.3869161-1.0155.3869161-1.40325 0l-2.001-1.9966968" />
                    <path d="m72.995525 29.2467535-8.42025-8.4021419 9.8235-9.80237418 8.42025 8.40214198" />
                  </g>
                  <path
                    d="m85.499525 12.3168155 6.09075 6.0776516c.387.3861677.387 1.0133161 0 1.4002323l-1.404 1.4002322c-1.5495 1.5469161-4.06275 1.5469161-5.613 0l-11.92875-11.90309676c-1.55025-1.54691613-1.55025-4.0547613 0-5.60092903l1.40325-1.40023223c.38775-.38691613 1.01625-.38691613 1.404 0l3.64125 3.63341935m-12.80895 31.3291303-14.3385-14.3076645c-.38775-.3869161-.38775-1.0140645 0-1.4009806l1.05225-1.0499871c3.1005-3.0938323 8.12625-3.0938323 11.22675 0l9.1215 9.1018838c3.1005 3.0938323 3.1005 8.1095226 0 11.2033549l-1.05225 1.0499871c-.38775.3869161-1.0155.3869161-1.40325 0l-2.001-1.9966968m-4.31415-19.0084335 9.8235-9.80237424m8.4201 8.40206714-9.8235 9.8023741"
                    stroke="#222426"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                  <path
                    d="m59.312825 30.2969652-11.961 14.7439742c-.75.9235096.4695 2.1403871 1.395 1.3927483l14.77575-11.9360258"
                    stroke="#222426"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                </g>
              </svg>
              <h6>The direct messages doesn't have any pinned messages yet</h6>
            </>
          ) : ( */}
          <Message
            name="kedar"
            uniqueCode="5256"
            content="Hello World"
            createdAt={Date.now()}
            userImage="https://res.cloudinary.com/dbi3rrybd/image/upload/v1686048004/Discord/gh1v9hotmsfjnbjnmltd.ico"
            _id="alsjdflakjlfkjal"
          />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default PinnedMsgsModal;
