import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-index.png";
import path from "../../ultils/path";

const Header = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const paths = {
    Home: path.HOME,
    Quizz: path.RIDDLE,
    Discover: path.EXPLORE_WORD,
    Login: path.LOGIN,
  };

  return (
    <header className="h-[65px] border-b-2 border-gray-200 shadow-lg flex items-center">
      <div className="w-full flex items-center gap-20 relative">
        <div className="ml-[56px] cursor-pointer">
          <img className="w-[110px]" src={logo} alt="logo" />
        </div>
        <div className="absolute left-[50%]">
          <ul className="flex gap-14 text-[16px] font-medium translate-x-[-50%]">
            {["Home", "Quizz", "Discover", "Login"].map((item, index) => (
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
