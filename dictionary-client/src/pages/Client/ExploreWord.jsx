import React, { useState, useEffect } from "react";
import { Banner, BannerBottom } from "../../components/index";
import icons from "../../ultils/icons";
import { apiGetAllCategory, apiGetTotalCategory } from "../../apis";
const {} = icons;

const ExloreWord = () => {
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);

  // Gọi API để lấy danh sách các danh mục
  useEffect(() => {
    apiGetAllCategory()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // gọi api để lấy tổng số danh mục
  useEffect(() => {
    apiGetTotalCategory()
      .then((response) => {
        setTotalCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total categories:", error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    console.log("Category ID:", categoryId);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full">
        <Banner />
      </div>
      <div className="text-[#242938] text-[32px] font-bold leading-[40px] mt-[68px]">
        Khám phá các từ theo danh mục
      </div>

      <div className="w-full flex justify-center items-center mt-12 gap-8 flex-wrap">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-[#f5f8f9] rounded-[12px] p-5 w-[342px] flex gap-4 items-center cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="rounded-[10px] w-[90px] h-[90px]">
              <img
                className="rounded-[10px] w-[90px] h-[90px]"
                src={category.thumbnail}
                alt={category.nameCategory}
              />
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#242938] leading-[28px]">
                {category.nameCategory}
              </div>
              <div className="font-normal text-[18px] text-[#90939b] leading-[28px]">
                {category.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[280px] bg-custom3 bg-zoom-large mt-20 w-[102%] flex items-center justify-center">
        <div className="flex items-center justify-center gap-24">
          <div className="text-[#fff] font-bold leading-[40px] text-[32px] w-[450px]">
            DOL English tự hào đem đến từ điển Việt - Anh tốt nhất
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="text-[28px] font-semibold text-[#fff] leading-[36px]">
                {totalCategories}
              </div>
              <div className="text-[14px] text-[#d3e0ec] leading-[20px] font-medium">
                Danh mục
              </div>
            </div>

            <div className=" bg-[#d3e0ec] border-solid border-[0.1px] border-[#78a2cf]"></div>

            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="text-[28px] font-semibold text-[#fff] leading-[36px]">
                23.940
              </div>
              <div className="text-[14px] text-[#d3e0ec] leading-[20px] font-medium">
                Ví dụ
              </div>
            </div>

            <div className=" bg-[#d3e0ec] border-solid border-[0.1px] border-[#78a2cf]"></div>

            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="text-[28px] font-semibold text-[#fff] leading-[36px]">
                23.940
              </div>
              <div className="text-[14px] text-[#d3e0ec] leading-[20px] font-medium">
                Mô tả
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] w-full h-[493px] flex items-center justify-center">
        <BannerBottom />
      </div>
    </div>
  );
};

export default ExloreWord;
