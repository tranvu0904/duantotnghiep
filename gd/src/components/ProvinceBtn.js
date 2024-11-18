import React, { memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { path } from "../utils/constant";

const ProvinceBtn = ({ name, image, provinceCode }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const titleSearch = `Cho thuê ${name}, Phòng  trọ giá rẻ`;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: titleSearch }
    );
  };
  return (
    <div
      className="shadow-md rounded-bl-md rounded-br-md  text-blue-700 hover:text-orange-600 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="font-medium p-2 text-center">{name}</div>
    </div>
  );
};

export default memo(ProvinceBtn);
