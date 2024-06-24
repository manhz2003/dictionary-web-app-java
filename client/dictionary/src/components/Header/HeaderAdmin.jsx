import React, { useState } from "react";
import icons from "../../ultils/icons";
const { IoMdArrowDropdown, FaUser } = icons;
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const toggleLogout = () => {
    setLogoutVisible(!isLogoutVisible);
  };

  return (
    <div className="flex items-center justify-between bg-[#fbfcff] h-[80px] px-[45px] border-b border-gray-100 shadow-md relative z-50">
      <div>
        <div className="font-bold text-[22px] leading-[25px]">
          PHẦN MỀM QUẢN LÝ TỪ ĐIỂN DOL
        </div>
        <div className="leading-[25px]">DOL DICTIONARY MANAGEMENT SOFTWARE</div>
      </div>
      <div className="flex items-center relative">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={toggleLogout}
        >
          <div className="bg-[#d1d5da] rounded-[100%] p-2">
            <FaUser size="24px" color="#fff" />
          </div>
          <div className="flex items-center gap-2 text-[#242938] select-none">
            <div>Mạnh</div>
            <IoMdArrowDropdown size="22px" color="#242938" />
          </div>
        </div>
        {isLogoutVisible && (
          <div className="absolute top-[60px] right-0 z-[1000] bg-white border border-gray-100 rounded-[8px] w-[165px] shadow-md">
            <div className="py-2 px-3 hover:bg-gray-100 cursor-pointer">
              <Link to="/login">Đăng xuất</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderAdmin;
