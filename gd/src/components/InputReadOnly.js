import React from "react";

const InputReadOnly = ({ label, value, direction, editPhone }) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col gap-2"}`}>
      <label className="w-48 flex-none font-semibold" htmlFor="exactly-address">
        {label}
      </label>
      <div className="flex-auto">
        <input
          id="exactly-address"
          type="text"
          readOnly
          className="p-2 w-full border border-gray-200 bg-gray-100 rounded-md outline-none"
          value={value || ""}
        />
        {editPhone && (
          <small className="text-blue-500 py-4 cursor-pointer">Đổi số điện thoại</small>
        )}
      </div>
    </div>
  );
};

export default InputReadOnly;
