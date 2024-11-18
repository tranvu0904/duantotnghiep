import React, { useEffect, useState } from "react";
import { Button, InputForm } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  });

  useEffect(() => {
    msg && Swal.fire("Oops !", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload);
    if (invalids === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
  };

  // Check validate
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trổng trường này",
          },
        ]);
        invalids++;
      }
    });

    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mật khẩu phải có tối thiểu 6 ký tự",
              },
            ]);
            invalids++;
          }
          break;
        case "phone":
          if (!+item[1]) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Số điện thoại không hợp lệ",
              },
            ]);
            invalids++;
          }
          break;
        default:
          break;
      }
    });
    return invalids;
  };

  return (
    <div className="bg-white w-[600px] mt-[12px] pt-[30px] pb-[40px] rounded-md shadow-sm justify-center">
      <h3 className="font-semibold text-2xl justify-center flex">
        {isRegister ? "Đăng Ký Tài Khoản" : "Đăng Nhập"}
      </h3>
      <div className="w-full flex flex-col gap-5 p-[20px]">
        {isRegister && (
          <InputForm
            label={"HỌ TÊN"}
            value={payload.name}
            keyPayload={"name"}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        )}
        <InputForm
          label={"SỐ ĐIỆN THOẠI"}
          value={payload.phone}
          keyPayload="phone"
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputForm
          label={"MẬT KHẨU "}
          value={payload.password}
          keyPayload="password"
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          type="password"
        />
        <Button
          text={isRegister ? "Đăng Ký" : "Đăng Nhập"}
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
          onClick={handleSubmit}
        />

        <div className="flex justify-between px-[12px] items-center">
          {isRegister ? (
            <span>
              Bạn đã có tài khoản?
              <span
                className="ml-[4px] text-[blue] hover:text-[red] cursor-pointer"
                onClick={() => {
                  setIsRegister(false);
                  setPayload({
                    name: "",
                    phone: "",
                    password: "",
                  });
                }}
              >
                Đăng nhập ngay
              </span>
            </span>
          ) : (
            <>
              <span className="text-[blue] hover:text-[red] cursor-pointer">
                Quên mật khẩu?
              </span>
              <span
                className="text-[blue] hover:text-[red] cursor-pointer"
                onClick={() => {
                  setIsRegister(true);
                  setPayload({
                    name: "",
                    phone: "",
                    password: "",
                  });
                }}
              >
                Tạo tài khoản
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
