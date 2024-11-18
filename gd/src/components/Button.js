import React from "react";

function Button({ text, textColor, bgColor, IcAfter, onClick, fullWidth, px }) {
  return (
    <button
      type="button"
      className={`py-2 ${px ? px : "px-2"} px-4 ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      {text}
      {IcAfter && <IcAfter />}
    </button>
  );
}

export default Button;
