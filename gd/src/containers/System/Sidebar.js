import React from "react";
import anonAvatar from "../../assets/anonavatar.png";
import { useDispatch, useSelector } from "react-redux";
import menuSidebar from "../../utils/menuSidebar";
import { NavLink } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import * as actions from "../../store/actions";
import { blobToBase64 } from "../../utils/Common/toBase64";

const activeStyle =
  "hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 mb-1 font-bold bg-gray-200";
const notActiveStyle =
  "hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 mb-1";

const Sidebar = () => {
  const { currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="w-[306px] min-h-screen p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={blobToBase64(currentData?.avatar) || anonAvatar}
            alt="avatar"
            className="h-12 w-12 object-cover rounded-full border-2 border-white"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{currentData?.name}</span>
            <small className="font-semibold">{currentData?.phone}</small>
          </div>
        </div>
        <span>
          Mã thành viên :{" "}
          <small className="font-bold">
            {currentData?.id?.match(/\d/g).join("").slice(0, 6)}
          </small>
        </span>
      </div>
      <div>
        {menuSidebar.map((item) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
              key={item.id}
              to={item.path}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          );
        })}
        <span
          className={`cursor-pointer ${notActiveStyle}`}
          onClick={() => {
            dispatch(actions.logout());
          }}
        >
          <BiLogOutCircle size={16} />
          <p>Thoát</p>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
