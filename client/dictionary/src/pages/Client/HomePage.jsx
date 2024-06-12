import icons from "../../ultils/icons";

const { CiSearch } = icons;

const HomePage = () => {
  return (
    <>
      <div className="bg-custom h-[424px] bg-zoom">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="flex mt-[110px] gap-3 text-[56px] leading-[68px]">
            <div className="text-[#d42525] font-bold">DOL</div>
            <div className="text-[#242938] font-bold">Dictionary</div>
          </h1>
          <div className="text-[18px] text-[#505460] flex flex-col justify-center items-center gap-3 mt-6">
            <div>Từ điển Việt - Anh chính xác nhất, chi tiết nhất.</div>
            <div>
              Cùng phát triển Dictionary với DOL bằng việc đề xuất thêm từ vựng
              nhé!
            </div>
          </div>

          <div className="mt-[52px] relative">
            <input
              className="p-3 rounded-[14px] w-[800px] h-[50px] text-[18px] text-[#505460] 
              placeholder-[#a5a8b4] border-[2px] border-[#2a61d4] focus:outline-none focus:ring-4
               focus:ring-[#cad8f7]"
              type="text"
              placeholder="Nhập từ bạn cần tìm ?"
            />
            <div className="absolute top-3 right-3">
              <CiSearch size="24px" color="#2a61d4" fontWeight="bold" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
