import icons from "../../ultils/icons";
const { FaRegUser, IoMdArrowDropdown, FaUser } = icons;

const HeaderAdmin = () => {
  return (
    <>
      <div className=" flex items-center w-full h-[80px] justify-between bg-[#fbfcff] border-b border-gray-100 drop-shadow ">
        <div className="pl-[45px]">
          <div className=" font-bold text-[22px] leading-[25px]">
            PHẦN MỀM QUẢN LÝ TỪ ĐIỂN DOL
          </div>
          <div className=" leading-[25px]">
            DOL DICTIONARY MANAGEMENT SOFTWARE
          </div>
        </div>
        <div className="flex gap-3 pr-[45px] items-center cursor-pointer">
          <div className="bg-[#d1d5da] rounded-[100%] p-2">
            <FaUser size=" 24px" color="#fff" />
          </div>
          <div className="flex gap-2">
            <div className=" text-[#242938]">Mạnh</div>
            <div className="">
              <IoMdArrowDropdown size="20px" color="#242938" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAdmin;
