import { Banner, BannerBottom } from "../../components/index";
import icons from "../../ultils/icons";

const {} = icons;

const SearchResult = () => {
  return (
    <>
      <div>
        <div>
          <Banner />
        </div>
        <div className="bg-[#f9fafa] w-full h-[493px] flex items-center justify-center">
          <BannerBottom />
        </div>
      </div>
    </>
  );
};

export default SearchResult;
