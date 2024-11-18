import React, { memo, useState } from "react";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../utils/Common/formatVietnameseToString";
import { path } from "../utils/constant";
import { blobToBase64 } from "../utils/Common/toBase64";

const { GrStar, RiHeartLine, RiHeartFill, BsBookmarkStarFill } = icons;
const anonAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdJemWHuVHGhH8ndYaNmX1nz4zh5bcn2eA6QRLJiGReA&s";

const Item = ({
  images,
  user,
  title,
  star,
  description,
  attributes,
  address,
  id,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const handleStar = (star) => {
    let starts = [];
    for (let i = 1; i < +star; i++)
      starts.push(<GrStar className="star-item" size={18} color="yellow" />);
    return starts;
  };

  return (
    <div className="w-full flex border-t border-orange-500">
      <Link
        to={`${path.DETAIL}${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
        className="w-2/5 flex flex-wrap gap-[2px] cursor-pointer relative my-[24px]"
      >
        {images.length > 0 &&
          images
            .filter((i, index) => [...Array(4).keys()].some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="preview"
                  className="w-[45%] h-[102px] object-cover "
                />
              );
            })}
        <span className="bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-1">
          {`${images.length} ảnh`}
        </span>
        <span
          className="absolute text-white right-10 bottom-1"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <RiHeartFill size={26} color="red" />
          ) : (
            <RiHeartLine size={26} />
          )}
        </span>
      </Link>
      <div className="w-3/5 mt-[8px] mb-[4px]">
        <div className="flex justify-between gap-4">
          <Link
            to={`${path.DETAIL}${formatVietnameseToString(
              title?.replaceAll("/", "")
            )}/${id}`}
            className="text-red-600 font-medium"
          >
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
            {title}
          </Link>

          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="two-lines flex my-2 gap-2 items-center justify-between">
          <span className="flex-3 font-bold text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">{`${
            address.split(",")[address.split(",").length - 2]
          },${address.split(",")[address.split(",").length - 1]}`}</span>
        </div>
        <p className="my-2 text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden ">
          {description}
        </p>
        <div className="flex items-center my-5 justify-between">
          <div className="flex items-center ">
            <img
              src={blobToBase64(user?.avatar) || anonAvatar}
              alt="Avatar"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p className="mx-1 ">{user?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <a
              href="tel:+84383609548"
              className="bg-blue-600 text-white p-1 rounded-md"
            >
              {`Gọi ${user?.phone}`}
            </a>
            <a
              href={`https://zalo.me/${user?.zalo}`}
              className="text-blue-700 rounded-md p-1 border border-blue-700"
              target="_blank"
            >
              Zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
