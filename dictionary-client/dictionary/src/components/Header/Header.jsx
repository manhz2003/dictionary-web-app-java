import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo-index.png";
import path from "../../ultils/path";

const Header = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(() => {
    const currentPath = window.location.pathname;
    return currentPath !== path.HOME
      ? localStorage.getItem("activeItem")
      : null;
  });

  const paths = {
    Home: path.HOME,
    Quizz: path.RIDDLE,
    Discover: path.EXPLORE_WORD,
    Login: path.LOGIN,
  };

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath !== path.HOME) {
      const activeItem = Object.keys(paths).find(
        (key) => paths[key] === currentPath
      );
      if (activeItem) {
        setActiveItem(activeItem);
        localStorage.setItem("activeItem", activeItem);
      }
    }
  }, [location.pathname]);

  const handleClick = (item) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item);
  };

  const handleLogoClick = () => {
    setActiveItem(null);
    localStorage.removeItem("activeItem");
  };

  return (
    <header
      className="fixed top-0 left-0 w-full h-[65px] border-b-2 border-gray-100 drop-shadow 
    flex items-center bg-white z-50 opacity-100"
    >
      <div className="w-full flex items-center gap-20 relative">
        <Link
          to={paths.Home}
          className="ml-[56px] cursor-pointer"
          onClick={handleLogoClick}
        >
          <img className="w-[110px]" src={logo} alt="logo" />
        </Link>
        <div className="absolute left-[50%]">
          <ul className="flex gap-14 text-[16px] font-medium translate-x-[-50%]">
            {["Home", "Discover", "Login"].map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer hover:text-[#2a61d4] ${
                  activeItem === item ? "text-[#2a61d4]" : ""
                }`}
                onClick={() => handleClick(item)}
              >
                <Link to={paths[item]}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
