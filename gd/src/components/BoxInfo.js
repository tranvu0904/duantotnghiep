import React, { memo } from "react";
import anonAvatar from "../assets/anonavatar.png";
import icons from "../utils/icons";

const { BsDot, BsTelephoneFill, SiZalo } = icons;

const BoxInfo = ({ userData }) => {
  return (
    <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-2">
      <img
        src={anonAvatar}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
      <h3 className="font-medium text-xl ">{userData?.name}</h3>
      <span className="flex items-center">
        <BsDot color="green" size={28} />
        <span>Đang hoạt động</span>
      </span>
      <a
        className="bg-[#13BB7B] py-2 px-1 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg"
        href="tel:+84383609548"
      >
        <BsTelephoneFill /> {userData?.phone}
      </a>
      <a
        className="bg-[#dad8d8] py-2 flex items-center justify-center w-full rounded-md font-bold text-lg"
        href={`https://zalo.me/${userData?.zalo}`}
      >
        <SiZalo color="blue"  size={28}/>
      </a>
    </div>
  );
};

export default memo(BoxInfo);
