import React from "react";
import { localtion } from "../utils/constant";
import ProvinceBtn from "./ProvinceBtn";

const Province = () => {
  return (
    <div className="flex justify-center items-center gap-5 py-5">
      {localtion.map((item) => {
        return (
          <ProvinceBtn
            key={item.id}
            name={item.name}
            image={item.image}
            provinceCode={item.provinceCode}
          />
        );
      })}
    </div>
  );
};

export default Province;
