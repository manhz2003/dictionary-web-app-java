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
    <>
      <div className="flex items-center w-full h-[80px] justify-between bg-[#fbfcff] border-b border-gray-100 drop-shadow relative z-50">
        <div className="pl-[45px]">
          <div className="font-bold text-[22px] leading-[25px]">
            PHẦN MỀM QUẢN LÝ TỪ ĐIỂN DOL
          </div>
          <div className="leading-[25px]">
            DOL DICTIONARY MANAGEMENT SOFTWARE
          </div>
        </div>
        <div className=" relative">
          <div
            className="flex gap-3 pr-[45px] items-center cursor-pointer"
            onClick={toggleLogout}
          >
            <div className="bg-[#d1d5da] rounded-[100%] p-2">
              <FaUser size="24px" color="#fff" />
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-[#242938] select-none">Mạnh</div>
              <div>
                <IoMdArrowDropdown size="22px" color="#242938" />
              </div>
            </div>
          </div>
          {isLogoutVisible && (
            <div className="absolute bottom-[-60px] left-[-70px] z-[1000] bg-[#fff] border border-gray-100 rounded-[8px] w-[165px] py-2">
              <div className="py-3 px-5 w-full hover:bg-[#f3f4f6] text-[14px] cursor-pointer">
                <Link to="/login" className="">
                  Đăng xuất
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderAdmin;
