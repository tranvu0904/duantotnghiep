import React from "react";
import { useSelector } from "react-redux";
import anonAvatar from "../assets/anonavatar.png";
import { blobToBase64 } from "../utils/Common/toBase64";

const User = () => {
  const { currentData } = useSelector((state) => state.user);
  return (
    <>
      {currentData && Object.keys(currentData).length > 0 && (
        <div className="flex items-center">
          <img
            src={blobToBase64(currentData?.avatar) || anonAvatar}
            alt="avatat"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col ml-2 mr-4">
            <span>
              Xin chào,{" "}
              <span className="font-semibold">{currentData?.name}</span>
            </span>
            {/* <span>Mã tài khoản: <span className='font-semibold'>{`${currentData?.id?.slice(0,6)}...`}</span></span> */}

            <span>
              Mã tài khoản:{" "}
              <span className="font-semibold">
                {currentData?.id?.match(/\d/g).join("").slice(0, 6)}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
