import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Emoji = () => {
  return <Picker data={data} theme="dark" searchPosition="static" onEmojiSelect onClickOutside />;
};

export default Emoji;
