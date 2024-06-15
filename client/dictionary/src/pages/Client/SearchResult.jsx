import { Banner, BannerBottom } from "../../components/index";
import icons from "../../ultils/icons";
import searchResult1 from "../../assets/images/search-result-1.jpeg";
import searchResult2 from "../../assets/images/search-result-2.jpeg";
import searchResult3 from "../../assets/images/search-result-3.jpeg";
import searchResult5 from "../../assets/images/search-result-5.jpeg";
import searchResult7 from "../../assets/images/search-result-7.jpeg";
import searchResult8 from "../../assets/images/search-result-8.jpeg";
import searchResult9 from "../../assets/images/search-result-9.jpeg";
import searchResult10 from "../../assets/images/search-result-10.jpeg";

const {} = icons;

const truncateDescription = (description, wordLimit = 20) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

const SearchResult = () => {
  const results = [
    {
      image: searchResult1,
      title: "cây chuối",
      description:
        "Cây thường mọc lên cao, thẳng, và hơi vững, quả chuối ra thành nải treo.",
    },
    {
      image: searchResult2,
      title: "Chuối xấy",
      description: "chuối sấy giòn.",
    },
    {
      image: searchResult3,
      title: "Chuối chiên",
      description:
        "Ấn Độ, với nguyên liệu chính là quả chuối, dầu (hoặc mỡ) và bột (thường là bột mì) và các thành",
    },
    {
      image: searchResult5,
      title: "cây chuối sáp",
      description:
        "Chuối sáp là loại chuối có hình dạng khá giống với chuối sứ, nhưng quả có xu hướng mập và nhỏ hơn ",
    },
    {
      image: searchResult7,
      title: "bánh chuối chiên",
      description: "Chuối chiên.",
    },
    {
      image: searchResult8,
      title: "cây chuối tiêu",
      description: "chuối già, ba thư, bản tiêu, tiêu tử, ba quả.",
    },
    {
      image: searchResult9,
      title: "cây chuối sợi",
      description:
        "Chuối sợi là cây trồng, giống như cây chuối, bẹ lá cho sợi làm thừng, quả không ăn được.",
    },
    {
      image: searchResult10,
      title: "cây chuối chát",
      description: "Chuối hột.",
    },
    {
      image: searchResult2,
      title: "cây chuối sứ",
      description: "cây chuối Xiêm, cây chuối hương, cây chuối mốc.",
    },
    {
      image: searchResult3,
      title: "cây chuối hột",
      description: "chuối chát",
    },
  ];

  return (
    <>
      <div className="search-result">
        <div>
          <Banner />
        </div>
        <div className="w-full flex justify-center">
          <div className="w-[50%]">
            <div className="flex items-center gap-2 font-normal text-[18px] leading-[28px] my-8">
              <span className=" font-bold text-[#242938]">
                {results.length}
              </span>
              <span className="text-[#8e9199]">
                kết quả tìm kiếm liên quan đến từ khoá
              </span>
              <span className=" font-bold text-[#242938]">“quả chuối”</span>
            </div>
            <div className="flex flex-col gap-5">
              {results.map((result, index) => (
                <div key={index} className="flex gap-3">
                  <div className=" cursor-pointer rounded-[8px] w-[75px] h-[75px]">
                    <img
                      className="rounded-[8px] w-[75px] h-[75px]"
                      src={result.image}
                      alt="searchResult"
                    />
                  </div>
                  <div className="items-center flex-col mb-10">
                    <div className="text-[18px] text-[#242938] font-semibold leading-[28px]">
                      {result.title}
                    </div>
                    <div className=" font-normal leading-[20px] text-[14px] text-[#82858d]">
                      {truncateDescription(result.description)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10"></div>

        <div className="bg-[#f9fafa] w-full h-[493px] flex items-center justify-center">
          <BannerBottom />
        </div>
      </div>
    </>
  );
};

export default SearchResult;
