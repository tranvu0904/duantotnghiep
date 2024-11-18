import React from "react";
import { Navigation } from "../Public";

const Header = () => {
  return (
    <div className="w-full flex">
      <div className="flex justify-center items-center font-bold bg-orange-500 text-white w-[256px] flex-none">
        Phongtro
      </div>
      <div className="flex-auto">
        <Navigation isAdmin={true} />
      </div>
    </div>
  );
};

export default Header;
