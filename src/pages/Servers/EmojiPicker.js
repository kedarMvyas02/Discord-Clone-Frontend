import React, { useState } from "react";
// import "emoji-picker-react/dist/universal/style.css";
import Picker from "emoji-picker-react";

function EmojiPicker() {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const handleEmojiClick = (event, emojiObject) => {
    console.log(event?.emoji);
    setChosenEmoji(event?.emoji);
  };

  return (
    <div>
    </div>
  );
}

export default EmojiPicker;
