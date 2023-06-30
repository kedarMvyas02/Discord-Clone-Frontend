// http://res.cloudinary.com/dbi3rrybd/image/upload/v1687949096/Discord/x9r8l0r4fgxbycugrjj6.gif

import React from "react";

const LoadingSpinner = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center pt-48 items-center pb-[300px] pl-[300px]"
    >
      <img
        src="http://res.cloudinary.com/dbi3rrybd/image/upload/v1687949096/Discord/x9r8l0r4fgxbycugrjj6.gif"
        alt=""
      />
    </div>
  );
};

export default LoadingSpinner;
