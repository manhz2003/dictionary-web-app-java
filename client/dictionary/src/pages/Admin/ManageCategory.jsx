import { Table } from "../../components/index";
import icons from "../../ultils/icons";
import image3 from "../../assets/images/image-home-3.png";
const { IoIosCreate, CiImport, CiExport, FiTrash2, LuPencilLine } = icons;
const ManageCategory = () => {
  const handleDelete = async (record) => {
    console.log("delete", record);
  };

  const handleEdit = (record) => {
    console.log("edit", record);
  };
  const column = [
    {
      title: "No",
      key: "no",
      sort: true,
    },
    {
      title: "Tên danh mục",
      key: "categoryName",
      sort: true,
    },
    {
      title: "Mô tả",
      key: "description",
      sort: true,
    },
    {
      title: "Hình ảnh",
      key: "thumnail",
      sort: true,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-3 cursor-pointer">
            <FiTrash2 color="red" onClick={() => handleDelete(record)} />
            <LuPencilLine color="#1677ff" onClick={() => handleEdit(record)} />
          </div>
        );
      },
    },
  ];

  const data = [
    {
      no: 1,
      categoryName: "Động vật",
      description: "Đây là mô tả cho danh mục 1",
      thumnail: "ảnh",
    },
    {
      no: 2,
      categoryName: "Cây cối",
      description: "Đây là mô tả cho danh mục 2",
      thumnail: "ảnh",
    },
  ];

  const groupButton = [
    {
      id: 1,
      button: (
        <div className="">
          <input
            className="text-[15px] p-[11px] border-2 border-gray-100 rounded-[7px] outline-none w-[300px]"
            type="text"
            placeholder="Tìm kiếm ..."
          />
        </div>
      ),
    },
    {
      id: 2,
      button: (
        <div
          className="p-3 text-[#fff] bg-[#d42525] rounded-[7px] cursor-pointer"
          onClick={() => {
            console.log("search");
          }}
        >
          search
        </div>
      ),
    },
    {
      id: 3,
      button: (
        <div className="p-3 text-[#242938] bg-[#fff] rounded-[7px] cursor-pointer">
          clear
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#fff] border-2 border-gray-100 drop-shadow p-5 rounded-[6px]">
      <div className="flex justify-between items-center border-b-2 border-gray-100 drop-shadow bg-[#fafafa] rounded-[8px] p-3">
        <div className="font-semibold text-[21px]">Category Lists</div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center p-3 bg-[#d42525] rounded-[7px] gap-1
            text-[#fff] cursor-pointer text-[15px]"
          >
            <div>
              <IoIosCreate />
            </div>
            <div>Thêm mới</div>
          </div>
          <div
            className="flex items-center justify-center p-3 bg-[#d42525] rounded-[7px] gap-1
            text-[#fff] cursor-pointer text-[15px]"
          >
            <div>
              <CiImport />
            </div>
            <div>Import</div>
          </div>
          <div
            className="flex items-center justify-center p-3 bg-[#d42525] rounded-[7px] gap-1
            text-[#fff] cursor-pointer text-[15px]"
          >
            <div>
              <CiExport />
            </div>
            <div>Export</div>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t-2 border-gray-100 drop-shadow">
        <Table
          title="Danh mục từ vựng"
          columns={column}
          data={data}
          maxH={300}
          groupButton={groupButton}
        />
      </div>
    </div>
  );
};

export default ManageCategory;
