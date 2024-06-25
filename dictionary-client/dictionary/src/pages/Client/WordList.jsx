import React from "react";
import { Banner, BannerBottom } from "../../components/index";
import icons from "../../ultils/icons";
import { useNavigate } from "react-router-dom";

const {} = icons;

const WordList = () => {
  const fakeWords = Array(603).fill("Nhà môi trường học");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [wordsPerPage] = React.useState(100);

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
              {pageGroup > 1 && <button onClick={previousGroup}>...</button>}
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
        <div>
          <BannerBottom />
        </div>
      </div>
    </>
  );
};

export default WordList;
