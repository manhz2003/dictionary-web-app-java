import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo-index.png";
import path from "../../ultils/path";
import icons from "../../ultils/icons";
const { TiHomeOutline, BiCategory, SiPhpmyadmin } = icons;

const menuAdmin = [
  {
    id: 1,
    name: "Dashboad",
    path: `/${path.ADMIN}`,
    icon: TiHomeOutline,
  },
  {
    id: 2,
    name: "Manage category",
    path: `/${path.ADMIN}/manage-category`,
    icon: BiCategory,
  },
  {
    id: 3,
    name: "Manage vocabylary",
    path: `/${path.ADMIN}/manage-vocabulary`,
    icon: SiPhpmyadmin,
  },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="">
      <div className="p-5">
        <div className="w-[150px]">
          <img className="w-[150px]" src={logo} alt="logo" />
        </div>
      </div>

      <div className="mt-8">
        <ul className="flex flex-col gap-3 w-full">
          {menuAdmin.map((menu) => (
            <li
              key={menu.id}
              className={`flex items-center gap-3 w-full p-5 text-[18px] cursor-pointer font-normal ${
                location.pathname === menu.path
                  ? "text-[#d42525] bg-[#fbfcff]"
                  : "text-[#777d74]"
              }`}
            >
              <Link to={menu.path} className="flex items-center gap-3 w-full">
                <div>
                  <menu.icon size="" color="" />
                </div>
                <div>{menu.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
