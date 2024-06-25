import { useState, useEffect } from "react";
import { Banner, BannerBottom } from "../../components/index";
import icons from "../../ultils/icons";
import image from "../../assets/images/image-detail.jpeg";

const { MdOutlineSpeakerNotes, IoIosArrowForward, FaRegStar, FaStar } = icons;

const VocabularyDetail = () => {
  const [isFavourite, setIsFavourite] = useState(
    JSON.parse(localStorage.getItem("isFavourite")) || false
  );

  const handleClick = () => {
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    localStorage.setItem("isFavourite", JSON.stringify(isFavourite));
  }, [isFavourite]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full">
        <Banner />
      </div>
      <div className="w-[76%] flex justify-center flex-col">
        <div className="w-full flex mt-10 justify-between">
          <div>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleClick}
            >
              <div className="text-[20px] text-[#242938] leading-[60px] font-semibold">
                Đánh dấu từ yêu thích
              </div>

              <div className="cursor-pointer">
                {isFavourite ? <FaStar color="#f0d002" /> : <FaRegStar />}
              </div>
            </div>
            <div className="text-[14px] text-[#a6a9ae] leading-[20px] font-semibold">
              VIETNAMESE
            </div>
            <div className="text-[28px] text-[#242938] leading-[40px] font-semibold">
              ăn quá nhiều
            </div>
          </div>
          <div className=" rounded-[10px] w-[170px]">
            <img
              className="rounded-[10px] w-[170px]"
              src={image}
              alt="image detail"
            />
          </div>
        </div>
        <div>
          <div className="text-[14px] text-[#a6a9ae] leading-[20px] font-semibold">
            ENGLISH
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[28px] text-[#242938] leading-[40px] font-semibold">
              overeat
            </div>
            <div
              className="font-semibold leading-[20px] text-[14px] text-[#2a61d4] flex justify-center items-center py-1 px-3 
            border-solid border-[1px] border-[#2a61d4] rounded-[14px]"
            >
              VERB
            </div>
          </div>
          <div className="text-[18px] leading-[28px] font-normal text-[#242938]">
            /ˈoʊvəˌrit/
          </div>
          <div className="text-[18px] leading-[28px] font-normal text-[#242938] mt-4">
            Ăn quá là hành động ăn quá nhiều hoặc quá độ một loại thức ăn, gây
            hại cho sức khỏe.
          </div>
        </div>
        <div className="bg-[#f8f6fd] p-5 rounded-[10px] mb-5 mt-10">
          <div className="flex gap-3 items-center">
            <div className="bg-[#f0edfc] p-2 rounded-[10px] flex items-center justify-center">
              <MdOutlineSpeakerNotes color="#5b37d2" size="26px" />
            </div>
            <div className="font-semibold text-[24px] leading-[32px] text-[#242938]">
              Ví dụ
            </div>
          </div>

          <div className="mt-5">
            <div className="mt-5 ml-3">
              <div className="font-medium text-[18px] text-[#242938] leading-[28px]">
                1. Tôi không muốn ăn quá nhiều vào buổi tối.
              </div>
              <div className="text-[18px] text-[#41444b] leading-[28px] font-normal">
                I don't want to overeat at dinner.
              </div>
            </div>

            <div className="mt-5 ml-3">
              <div className="font-medium text-[18px] text-[#242938] leading-[28px]">
                2. Ellen không muốn khách ăn quá nhiều tại bữa tiệc.
              </div>
              <div className="text-[18px] text-[#41444b] leading-[28px] font-normal">
                Ellen don't want her guest to overeat at the party.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-10 font-normal leading-[20px] text-[14px] flex items-center gap-2">
          <span className="text-[#242938]">Danh sách từ mới nhất: </span>
          <span className=" cursor-pointer text-[#2a61d4]">
            Xem chi tiết
          </span>{" "}
          <span className=" cursor-pointer">
            <IoIosArrowForward color="#2a61d4" size="14px" />
          </span>
        </div>
      </div>

      <div className="bg-[#f9fafa] w-full h-[493px] flex items-center justify-center">
        <BannerBottom />
      </div>
    </div>
  );
};

export default VocabularyDetail;
