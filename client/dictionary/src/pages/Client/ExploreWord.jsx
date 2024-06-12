import { Banner } from "../../components/index";
import icons from "../../ultils/icons";
const { FaFacebookMessenger, FaPhone, FaMapMarkerAlt } = icons;
import categoryAnimal from "../../assets/images/category-animal.jpeg";
import categoryFuiltTree from "../../assets/images/category-fuilt-tree.jpeg";
import categoryItem from "../../assets/images/category-item.jpeg";
import categoryIt from "../../assets/images/category-it.jpeg";
import categoryCommunicate from "../../assets/images/category-communicate.jpeg";
import categoryActionGestures from "../../assets/images/category-actions-gestures.jpeg";

const ExloreWord = () => {
  const categories = [
    { name: "Động vật", englishName: "Animal", image: categoryAnimal },
    {
      name: "Cây cối, hoa quả",
      englishName: "Plant and Fruits",
      image: categoryFuiltTree,
    },
    { name: "Đồ vật", englishName: "items", image: categoryItem },
    {
      name: "giao tiếp",
      englishName: "Communicate",
      image: categoryCommunicate,
    },
    {
      name: "hành động, cử chỉ",
      englishName: "Actions, gestures",
      image: categoryActionGestures,
    },
    {
      name: "Chuyên ngành IT",
      englishName: "majoring in IT",
      image: categoryIt,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full">
        <Banner />
      </div>
      <div className="text-[#242938] text-[32px] font-bold leading-[40px] mt-[68px]">
        Khám phá các từ theo danh mục
      </div>

      <div className="w-full flex justify-center items-center mt-12 gap-8 flex-wrap">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-[#f5f8f9] rounded-[12px] p-5 w-[342px] flex gap-4 items-center cursor-pointer"
          >
            <div className="rounded-[10px] w-[90px] h-[90px]">
              <img
                className="rounded-[10px] w-[90px] h-[90px]"
                src={category.image}
                alt={category.name}
              />
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#242938] leading-[28px]">
                {category.name}
              </div>
              <div className="font-normal text-[18px] text-[#90939b] leading-[28px]">
                {category.englishName}
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
                23.940
              </div>
              <div className="text-[14px] text-[#d3e0ec] leading-[20px] font-medium">
                Từ vựng
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
                Ghi chú
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] w-full h-[493px] flex items-center justify-center">
        <div>
          <div className="w-[490px] text-[#313a44] text-[32px] font-bold leading-[40px] ">
            Đóng góp từ mới vào từ điển cho cộng đồng{" "}
            <span className="text-[#d42525]">miễn phí</span> hãy liên hệ
          </div>
          <div className="flex flex-col gap-5 mt-10">
            <div className="flex gap-3 cursor-pointer">
              <div className="w-[40px] h-[40px] bg-[#f1f4f7] rounded-[9px] flex justify-center items-center p-1">
                <FaFacebookMessenger size="20px" color="#2096f3" />
              </div>
              <div className="flex flex-col gap-2 text-[#313a44]">
                <div className="font-bold text-[18px]">
                  Nhắn tin DOL qua Facebook
                </div>
                <div className="text-[12px]">
                  Click để nhắn tin với DOL qua fanpage chính
                </div>
              </div>
            </div>

            <div className="flex gap-3 cursor-pointer">
              <div className="w-[40px] h-[40px] bg-[#f1f4f7] rounded-[9px] flex justify-center items-center p-1">
                <FaPhone size="20px" color="#04a56c" />
              </div>
              <div className="flex flex-col gap-2 text-[#313a44]">
                <div className="font-bold text-[18px]">Gọi điện liên hệ</div>
                <div className="text-[12px]">
                  Liên hệ DOL qua hotline miễn phí: 1800 96 96 39
                </div>
              </div>
            </div>

            <div className="flex gap-3 cursor-pointer">
              <div className="w-[40px] h-[40px] bg-[#f1f4f7] rounded-[9px] flex justify-center items-center p-1">
                <FaMapMarkerAlt size="20px" color="#d42525" />
              </div>
              <div className="flex flex-col gap-2 text-[#313a44]">
                <div className="font-bold text-[18px]">
                  DOL có địa chỉ tại 4, kiều mai, quận bắc từ liêm, hà nội
                </div>
                <div className="text-[12px]">Click để xem địa chỉ chi tiết</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%]"></div>
      </div>
    </div>
  );
};

export default ExloreWord;
