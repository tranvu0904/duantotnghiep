import React from "react";
import { InputFormV2, InputReadOnly, Select } from "./";
import { useSelector } from "react-redux";

const targets = [
  {
    code: "Tất cả",
    value: "Tất cả",
  },
  {
    code: "Nam",
    value: "Nam",
  },
  {
    code: "Nữ",
    value: "Nữ",
  },
];
const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);

  const handleChangeDescription = (e) => {
    const value = e.target.value;

    try {
      const parsedValue = JSON.parse(value); // Cố gắng parse value thành một mảng
      if (Array.isArray(parsedValue)) {
        // Nếu parse thành công và là mảng, setPayload với giá trị này
        setPayload((prev) => ({
          ...prev,
          description: parsedValue,
        }));
      } else {
        // Nếu parse thành công nhưng không phải mảng, setPayload với một mảng chứa giá trị đó
        setPayload((prev) => ({
          ...prev,
          description: [value],
        }));
      }
    } catch (error) {
      // Nếu parse không thành công, tức là value không phải là JSON, setPayload với một mảng chứa giá trị đó
      setPayload((prev) => ({
        ...prev,
        description: [value],
      }));
    }
  };

  return (
    <div>
      <h2 className="font-bold mb-2">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-4">
        <div className="w-1/2">
          <Select
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            value={payload?.categoryCode}
            setValue={setPayload}
            name="categoryCode"
            options={categories}
            label="Loại chuyên mục"
          />
        </div>
        <InputFormV2
          value={payload.title}
          setValue={setPayload}
          name="title"
          label="Tiêu đề"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <div className=" flex flex-col gap-2">
          <label htmlFor="desc">Nội dung mô tả </label>
          <textarea
            id="desc"
            cols="30"
            rows="10"
            value={payload.description}
            onChange={handleChangeDescription}
            className="w-full rounded-md outline-none border border-gray-300 p-2"
            onFocus={() => setInvalidFields([])}
          ></textarea>
          <small className="text-red-500">
            {invalidFields?.some((item) => item.name === "description") &&
              invalidFields?.find((item) => item.name === "description")
                .message}
          </small>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <InputReadOnly
            label="Thông tin liên hệ"
            value={currentData?.name || currentData?.username}
          />
          <InputReadOnly label="Điện thoại" value={currentData?.phone} />
          <InputFormV2
            value={payload.priceNumber}
            setValue={setPayload}
            name="priceNumber"
            small="Vui lòng nhập đúng,ví dụ 1 triệu thì nhập là 1000000"
            label="Giá cho thuê"
            unit="đồng"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputFormV2
            value={payload.areaNumber}
            setValue={setPayload}
            name="areaNumber"
            label="Diện tích"
            unit="m2"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            value={payload.target}
            setValue={setPayload}
            name="target"
            options={targets}
            label="Đối tượng cho thuê"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
