import React from "react";
import { Banner, BannerBottom } from "../../components/index";
import icons from "../../ultils/icons";

const {} = icons;

const WordList = () => {
  const fakeWords = Array(203).fill("Nhà môi trường học");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [wordsPerPage] = React.useState(100);

  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = fakeWords.slice(indexOfFirstWord, indexOfLastWord);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <div>
          <Banner />
        </div>
        <div className="w-full flex justify-center">
          <div className="w-[76%]">
            <div className="flex justify-center my-6 text-[32px] leading-[40px] text-[#242938] font-bold">
              Danh sách từ mới nhất
            </div>
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
              {[...Array(Math.ceil(fakeWords.length / wordsPerPage))].map(
                (e, i) => (
                  <button
                    className={`py-3 px-4 ${
                      currentPage === i + 1 ? "text-[#2a61d4] bg-[#f3f4f6]" : ""
                    } hover:text-[#2a61d4] hover:bg-[#f3f4f6]`}
                    key={i}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        <div>
          <BannerBottom />
        </div>
      </div>
    </>
  );
};

export default WordList;
