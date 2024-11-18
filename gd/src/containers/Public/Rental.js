import React, { useEffect, useState } from "react";
import { ItemSidebar, Province, RelatedPost } from "../../components";
import { List, Pagination } from "./index";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { formatVietnameseToString } from "../../utils/Common/formatVietnameseToString";

const Rental = () => {
  const { categories, prices, areas } = useSelector((state) => state.app);
  const location = useLocation();
  const [categoryCode, setCategoryCode] = useState("");
  const [categoryCurrent, setCattegoryCurrent] = useState({});

  useEffect(() => {
    const category = categories?.find(
      (item) => `/${formatVietnameseToString(item.value)}` === location.pathname
    );
    setCattegoryCurrent(category);
    if (category) {
      setCategoryCode(category.code);
    }
  }, [location,categoryCode]);

  return (
    <div className=" w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{categoryCurrent?.header}</h1>
        <p className="text-base text-gray-700">{categoryCurrent?.subheader}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List categoryCode={categoryCode} />
          <Pagination />
        </div>
        <div className="w-[30%]  flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            isDouble={true}
            type="priceCode"
            title={"Xem theo giá"}
            content={prices}
          />
          <ItemSidebar
            isDouble={true}
            type="areaCode"
            title={"Xem theo diện tích"}
            content={areas}
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default Rental;
