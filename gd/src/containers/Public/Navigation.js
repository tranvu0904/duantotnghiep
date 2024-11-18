import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { formatVietnameseToString } from "../../utils/Common/formatVietnameseToString";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { path } from "../../utils/constant";

const notActive =
  "hover:bg-secondary2 px-4 h-full flex items-center bg-orange-500";
const active =
  "hover:bg-secondary2 px-4 h-full flex items-center bg-secondary2";

export const Navigation = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  return (
    <div
      className={`w-full flex ${
        isAdmin ? "justify-start" : "justify-center"
      } items-center text-white  h-[40px]`}
    >
      <div className="w-3/4 flex items-center h-full text-sm font-medium bg-orange-500">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div
                key={item.code}
                className="h-full flex justify-center items-center"
              >
                <NavLink
                  to={`/${formatVietnameseToString(item.value)}`}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
        <NavLink
          to={path.CONTACT}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Liên hệ
        </NavLink>
      </div>
    </div>
  );
};
export default Navigation;
