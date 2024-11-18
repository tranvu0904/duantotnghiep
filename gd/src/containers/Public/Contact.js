import React, { useState } from "react";
import { Button, InputForm } from "../../components";
import Swal from "sweetalert2";

const Contact = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });

  const handleSubmit = () => {
    Swal.fire(
      "Cảm ơn bạn!",
      "Phản hồi của bạn đã được chúng tôi ghi nhận!",
      "info"
    ).then(() => {
      setPayload({
        name: "",
        phone: "",
        content: "",
      });
    });
  };

  return (
    <div className="w-full">
      <h1 className="flex text-start text-3xl font-medium py-4 border-b mb-4 border-gray-300">
        Liên hệ với chúng tôi
      </h1>
      <div className="flex gap-4">
        <div className="flex flex-col flex-1 gap-4 h-fit bg-red-400 rounded-3xl p-8 text-white bg-gradient-to-br from-orange-500 to-orange-100">
          <h4 className="font-medium">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn.Nhưng cảm ơn vì đã lựa
            chọn trang web của chung tôi
          </span>
          <span>Điện thoại: 0383 609 548</span>
          <span>Email: cskh@gmail.com</span>
          <span>Zalo: 0383 609 548</span>
          <span>Viber: 0917 666 888</span>
          <span>
            Địa chỉ: 68 Lạc Long Quân, Phường Hòa Khánh Bắc, Quận Liên Chiểu,
            TP.Đà Nẵng
          </span>
        </div>

        <div className="flex-1 bg-white shadow-md rounded-md p-6 mb-6">
          <h4 className="font-medium text-lg mb-4">Liên hệ trực tuyến</h4>
          <div className="flex flex-col gap-4">
            <InputForm
              setValue={setPayload}
              value={payload.name}
              keyPayload="name"
              label="HỌ VÀ TÊN CỦA BẠN"
            />
            <InputForm
              setValue={setPayload}
              value={payload.phone}
              keyPayload="phone"
              label="SỐ ĐIỆN THOẠI"
            />
            <div>
              <label htmlFor="desc">NỘI DUNG MÔ TẢ</label>
              <textarea
                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                id="desc"
                cols="30"
                rows="3"
                value={payload.content}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, content: e.target.value }))
                }
              ></textarea>
            </div>
            <Button
              text="Gửi liên hệ"
              bgColor="bg-orange-500"
              textColor="text-white"
              fullWidth
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
