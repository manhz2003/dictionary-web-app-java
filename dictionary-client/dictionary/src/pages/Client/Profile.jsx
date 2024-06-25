import React, { useState, useEffect } from "react";
import icons from "../../ultils/icons";
const { FaRegUser, FaRegHeart, FaRegTrashCan } = icons;
import defaultAvatar from "../../assets/images/avatar-default.jpeg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("Personal info");
  const [avatar, setAvatar] = useState(defaultAvatar);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar(defaultAvatar);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const validateEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phoneNumber) => {
    var re = /^0[0-9]{9}$/;
    return re.test(phoneNumber);
  };

  const handleSave = () => {
    if (!name) {
      toast.error("Họ và tên là bắt buộc.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email không hợp lệ.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ.");
      return;
    }

    if (!address) {
      toast.error("Địa chỉ là bắt buộc.");
      return;
    }
  };

  const fakeWords = Array(403).fill("Nhà môi trường học");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [wordsPerPage] = React.useState(20);

  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = fakeWords.slice(indexOfFirstWord, indexOfLastWord);

  const [pageGroup, setPageGroup] = React.useState(1);
  const pagesPerGroup = 6;

  const totalPageGroups = Math.ceil(
    fakeWords.length / wordsPerPage / pagesPerGroup
  );
  const totalPageInCurrentGroup = Math.min(
    pagesPerGroup,
    Math.ceil(fakeWords.length / wordsPerPage) - (pageGroup - 1) * pagesPerGroup
  );
  const navigate = useNavigate();

  const paginate = (pageNumber) => {
    setCurrentPage((pageGroup - 1) * pagesPerGroup + pageNumber);
    navigate(`?page=${(pageGroup - 1) * pagesPerGroup + pageNumber}`);
  };
  const nextGroup = () => {
    setPageGroup(pageGroup + 1);
    setCurrentPage((pageGroup + 1) * pagesPerGroup + 1);
  };

  const previousGroup = () => {
    setPageGroup(pageGroup - 1);
    setCurrentPage((pageGroup - 1) * pagesPerGroup + 1);
  };

  return (
    <div className="w-full flex justify-center bg-[#f5f5f5] p-8">
      <div className="w-[96%] flex gap-7 justify-center">
        <div className="bg-[#333] w-[27%] rounded-[18px] h-[20%]">
          <div className="relative w-full h-[248px] bg-custom-avatar rounded-t-[18px] bg-cover text-[#fff] flex items-center justify-center flex-col">
            <div className="border-solid border-4 border-[#dfd1fa] rounded-[100%]">
              <div className="w-[116px] h-[116px] rounded-[100%]">
                <img
                  className="w-[116px] h-[116px] rounded-[100%] "
                  src={defaultAvatar}
                  alt="defaultAvatar"
                />
              </div>
            </div>
            <div className="relative z-10 flex justify-center items-center flex-col">
              <div className="font-bold leading-[30px] mt-2">
                Nguyễn Thế Mạnh
              </div>
              <div className="font-normal leading-[20px]">manhz2003</div>
            </div>
            <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <div className="w-full bg-[#fff] flex p-8 rounded-b-[18px] flex-col h-[250px]">
            <div className="font-medium text-[21px] leading-6">
              Manage Account
            </div>
            <div className="">
              <div
                className={`flex item-center gap-3 my-3 p-3 rounded-[8px] py-4 cursor-pointer hover:bg-[#ebebeb] ${
                  selectedTab === "Personal info" ? "bg-[#ebebeb]" : ""
                }`}
                onClick={() => setSelectedTab("Personal info")}
              >
                <div>
                  <FaRegUser />
                </div>
                <div className="text-[18px] ">Personal info</div>
              </div>

              <div
                className={`flex item-center gap-3 my-3 p-3 rounded-[8px] py-4 cursor-pointer hover:bg-[#ebebeb] ${
                  selectedTab === "Mnemonic dictionary" ? "bg-[#ebebeb]" : ""
                }`}
                onClick={() => setSelectedTab("Mnemonic dictionary")}
              >
                <div>
                  <FaRegHeart />
                </div>
                <div className="text-[18px] ">Mnemonic dictionary</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fff] w-[73%] rounded-[18px]">
          {selectedTab === "Personal info" ? (
            <div>
              <div className="p-10 text-[26px] font-medium">Personal Info</div>
              <div className="px-10 flex gap-5 flex-wrap">
                <div className="w-[420px]">
                  <label className=" font-medium" htmlFor="">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-solid border-[#e5e5e5] rounded-[8px] mt-4"
                    placeholder="Họ tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[420px]">
                  <label className=" font-medium" htmlFor="">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full p-3 border border-solid border-[#e5e5e5] rounded-[8px] mt-4"
                    placeholder="Email của bạn"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="w-[420px]">
                  <label className=" font-medium" htmlFor="">
                    Phone number
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-solid border-[#e5e5e5] rounded-[8px] mt-4"
                    placeholder="Số điện thoại của bạn"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[420px]">
                  <label className=" font-medium" htmlFor="">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-solid border-[#e5e5e5] rounded-[8px] mt-4"
                    placeholder="Địa chỉ của bạn"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="w-[420px]">
                  <label className=" font-medium" htmlFor="">
                    Avatar
                  </label>
                  <div>
                    <input
                      type="file"
                      required
                      className="w-full p-3 border border-solid border-[#e5e5e5] rounded-[8px] mt-4"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="px-10 mt-5">
                <div
                  className="w-[120px] h-[90px] rounded-[10px] cursor-pointer relative group"
                  onClick={handleDeleteAvatar}
                >
                  <div className="border-solid border-2 border-[#ebebeb] rounded-[10px]">
                    <img
                      className="w-[120px] h-[90px] rounded-[10px]"
                      src={avatar}
                      alt="avatar"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 rounded-[10px]">
                      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-100">
                        <FaRegTrashCan color="#fff" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 flex justify-end ">
                <button
                  className="bg-[#d42525] p-3 rounded-[8px] w-[100px] text-[#fff] font-medium"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="p-10">
              <div className="text-[26px] font-medium">Mnemonic Dictionary</div>
              <div className="">
                <div className="flex flex-wrap gap-8 my-10">
                  {currentWords.map((word, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer gap-3 items-center text-[#7c7f88] w-[240px]"
                    >
                      <span className="text-[18px] leading-[24px]">
                        {index + 1}:{" "}
                      </span>
                      <span className="text-[#2a61d4] text-[18px] leading-[28px]">
                        <a href="">{word}</a>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 my-10">
                  {pageGroup > 1 && (
                    <button onClick={previousGroup}>...</button>
                  )}
                  {[...Array(totalPageInCurrentGroup)].map((e, i) => (
                    <button
                      className={`py-3 px-4 ${
                        currentPage === (pageGroup - 1) * pagesPerGroup + i + 1
                          ? "text-[#2a61d4] bg-[#f3f4f6]"
                          : ""
                      } hover:text-[#2a61d4] hover:bg-[#f3f4f6]`}
                      key={i}
                      onClick={() => paginate(i + 1)}
                    >
                      {(pageGroup - 1) * pagesPerGroup + i + 1}
                    </button>
                  ))}
                  {pageGroup < totalPageGroups && (
                    <button onClick={nextGroup}>...</button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
