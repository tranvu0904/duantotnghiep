import React, { useState } from "react";
import { Button, InputFormV2, InputReadOnly } from "../../components";
import anonavatar from "../../assets/anonavatar.png";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateUser } from "../../services/user";
import { blobToBase64, fileToBase64 } from "../../utils/Common/toBase64";
import Swal from "sweetalert2";
import { getCurrent } from "../../store/actions";

const EditAccount = () => {
  const { currentData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    zalo: currentData?.zalo || "",
    fbUrl: currentData?.fbUrl || "",
    avatar: blobToBase64(currentData?.avatar) || "",
  });
  const handleSubmit = async () => {
    const response = await apiUpdateUser(payload);
    if (response?.data?.err === 0) {
      Swal.fire(
        "Thành công!",
        "Chỉnh sửa thông tin thành công.",
        "success"
      ).then(() => {
        dispatch(getCurrent());
      });
    } else {
      Swal.fire("Thất bại!", "Chỉnh sửa thông tin thất bại.", "error");
    }
  };

  const handleUploadImage = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setPayload((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
  };
  return (
    <div className="flex flex-col items-center ">
      <h1 className="w-full text-start text-3xl font-medium py-4 border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 py-6 flex flex-col gap-4">
        <InputReadOnly
          direction="flex-row"
          label="Mã thành viên"
          value={currentData?.id?.match(/\d/g).join("").slice(0, 6) || ""}
        />
        <InputReadOnly
          // editPhone
          direction="flex-row"
          label="Số điện thoại"
          value={currentData?.phone || ""}
        />
        <InputFormV2
          name="name"
          setValue={setPayload}
          direction="flex-row"
          label="Tên hiển thị"
          value={payload.name}
        />
        <InputFormV2
          name="zalo"
          setValue={setPayload}
          direction="flex-row"
          label="Zalo"
          value={payload.zalo}
        />
        <InputFormV2
          name="fbUrl"
          setValue={setPayload}
          direction="flex-row"
          label="Facebook"
          value={payload.fbUrl}
        />
        {/* <div className="flex ">
          <label className="w-48 flex-none font-semibold" htmlFor="password">
            Mật khẩu
          </label>
          <small className="text-blue-500 py-4 cursor-pointer">
            Đổi mật khẩu
          </small>
        </div> */}
        <div className="flex mb-8">
          <label className="w-48 flex-none font-semibold" htmlFor="avatar">
            Ảnh đại diện
          </label>
          <div>
            <img
              src={payload.avatar || anonavatar}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover"
            />
            <input
              type="file"
              className="appearance-none my-4"
              onChange={handleUploadImage}
            />
          </div>
        </div>
        <Button
          text="Cập nhật"
          bgColor="bg-blue-600"
          textColor="text-white"
          onClick={handleSubmit}
        />
      </div>
      <div className="h-[300px]"></div>
    </div>
  );
};

export default EditAccount;
