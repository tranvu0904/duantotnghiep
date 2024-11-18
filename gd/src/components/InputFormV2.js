import React from "react";

const InputFormV2 = ({
  label,
  unit,
  value,
  setValue,
  name,
  small,
  invalidFields,
  setInvalidFields,
  direction,
}) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col"}`}>
      <label className="w-48 flex-none font-semibold" htmlFor="title">
        {label}
      </label>
      <div className="flex flex-auto flex-col">
        <div className="flex w-full items-center">
          <input
            type="text"
            id="title"
            value={value}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                [name]: e.target.value,
              }))
            }
            className={`${
              unit ? "rounded-tl-md rounded-bl-md " : "rounded-md"
            } outline-none border flex-auto border-gray-300 p-2`}
            onFocus={() => setInvalidFields && setInvalidFields([])}
          />
          {unit && (
            <span className="p-2 border flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-200">
              {unit}
            </span>
          )}
        </div>
        {invalidFields?.some((item) => item.name === name) && (
          <small className="items-start text-red-500">
            {invalidFields?.find((item) => item.name === name).message}
          </small>
        )}
      </div>
      {small && <small className="text-gray-400">{small}</small>}
    </div>
  );
};

export default InputFormV2;
