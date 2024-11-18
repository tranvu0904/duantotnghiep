import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../assets/logowithoutbg.png";
import { Button, User } from "../../components";
import icons from "../../utils/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../utils/menuManage";

const { AiOutlinePlusCircle, BiLogOutCircle, IoIosArrowDown } = icons;

function Header() {
  const navigate = useNavigate();
  const headeRef = useRef();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [isShowMenu, setIsShowMenu] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  useEffect(() => {
    headeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);

  const handleClick = () => {
    navigate(menuManage[0].path);
  };

  return (
    <div ref={headeRef} className="w-3/4">
      <div className="w-full flex items-center justify-between ">
        <img
          src={logo}
          alt="logo"
          className="w-[240px] h-[70px] object-contain"
        />
        <div className="flex items-center gap-2">
          {!isLoggedIn && (
            <div className="flex items-center gap-2">
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#FFA500]"
                onClick={() => {
                  goLogin(false);
                }}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#FFA500]"
                onClick={() => {
                  goLogin(true);
                }}
              />
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-2 relative">
              <span>
                <User />
              </span>
              <Button
                text={"Quản lí tài khoản"}
                IcAfter={IoIosArrowDown}
                textColor="text-white"
                bgColor="bg-orange-500"
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div className="absolute top-full right-0 bg-white min-w-200 shadow-md rounded-md flex flex-col p-4 z-50">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        className="flex gap-1 items-center border-b border-gray-200 py-2 hover:text-orange-500 text-blue-500"
                        key={item.id}
                        to={item.path}
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                  <span
                    className="flex gap-1 items-center cursor-pointer hover:text-orange-500 text-blue-500 py-2"
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout());
                    }}
                  >
                    <BiLogOutCircle size={20} />
                    <p>Đăng xuất</p>
                  </span>
                </div>
              )}
            </div>
          )}

          {isLoggedIn && (
            <Button
              onClick={handleClick}
              text={"Đăng tin mới"}
              textColor="text-white"
              bgColor="bg-red-500"
              IcAfter={AiOutlinePlusCircle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
