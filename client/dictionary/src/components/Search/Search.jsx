import icons from "../../ultils/icons";
const { CiSearch } = icons;

const Search = ({ width }) => {
  const inputWidth = typeof width === "number" ? `${width}px` : width;

  return (
    <div className=" relative">
      <input
        style={{ width: inputWidth }}
        className={`p-3 rounded-[14px] h-[50px] text-[18px] text-[#505460] 
              placeholder-[#a5a8b4] border-[2px] border-[#2a61d4] focus:outline-none focus:ring-4
               focus:ring-[#cad8f7]`}
        type="text"
        placeholder="Nhập từ bạn cần tìm ?"
      />
      <div className="absolute top-3 right-3">
        <CiSearch size="24px" color="#2a61d4" fontWeight="bold" />
      </div>
    </div>
  );
};

export default Search;
