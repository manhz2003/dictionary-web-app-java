import { useState, useRef } from "react";
import { Table, Drawer, Button } from "../../components/index";
import icons from "../../ultils/icons";
const { IoIosCreate, CiExport, FiTrash2, LuPencilLine, FaRegTrashCan } = icons;
import imageDefault from "../../assets/images/avatar-default.jpeg";

const ManageCategory = () => {
  const [clearSearch, setClearSeach] = useState("");
  const [showDes, setShowDes] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [defaultImage, setDefaultImage] = useState(imageDefault);
  const [nameCategory, setNameCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const inputFileRef = useRef();

  const handleDelete = async (record) => {
    console.log("delete", record);
  };

  const handleEdit = (record) => {
    setNameCategory(record.categoryName);
    setDescription(record.description);
    setDefaultImage(record.thumnail);
    setShowDes(true);
    setDrawerTitle("Cập nhật danh mục");
    setIsEditMode(true);
  };

  const handleClearSearch = () => {
    setClearSeach("");
  };

  const handleDeleteImage = () => {
    setDefaultImage(imageDefault);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setDefaultImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    if (nameCategory && description) {
      if (isEditMode) {
        console.log("update");
      } else {
        console.log("add new");
      }
    }
  };

  const handleAddNew = () => {
    setShowDes(true);
    setDrawerTitle("Thêm mới danh mục");
    setIsEditMode(false);
    setNameCategory("");
    setDescription("");
    setDefaultImage(imageDefault);
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
    {
      no: 3,
      categoryName: "Động vật",
      description: "Đây là mô tả cho danh mục 1",
      thumnail: "ảnh",
    },
    {
      no: 4,
      categoryName: "Cây cối",
      description: "Đây là mô tả cho danh mục 2",
      thumnail: "ảnh",
    },
    {
      no: 5,
      categoryName: "Động vật",
      description: "Đây là mô tả cho danh mục 1",
      thumnail: "ảnh",
    },
    {
      no: 6,
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
            onChange={(e) => {
              setClearSeach(e.target.value);
            }}
            value={clearSearch}
          />
        </div>
      ),
    },
    {
      id: 2,
      button: (
        <div>
          <Button
            style={
              "bg-[#d42525] text-[#fff] py-3 text-[16px] flex item-center gap-2"
            }
            handleOnclick={() => {
              console.log("search");
            }}
          >
            search
          </Button>
        </div>
      ),
    },
    {
      id: 3,
      button: (
        <div>
          <Button
            style={
              "bg-[#fff] text-[#000] py-3 text-[16px] flex item-center gap-2"
            }
            handleOnclick={handleClearSearch}
          >
            Clear
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-[#fff] border-2 border-gray-100 drop-shadow p-5 rounded-[6px]  h-[100%]">
        <div className="flex justify-between items-center border-b-2 border-gray-100 drop-shadow bg-[#fafafa] rounded-[8px] p-3">
          <div className="font-semibold text-[21px]">Manage category</div>
          <div className="flex items-center gap-3">
            <div>
              <Button
                style={
                  "bg-[#d42525] text-[#fff] py-3 text-[16px] flex item-center gap-2"
                }
                icon={<IoIosCreate />}
                handleOnclick={handleAddNew}
              >
                Create
              </Button>
            </div>

            <div>
              <Button
                style={
                  "bg-[#d42525] text-[#fff] py-3 text-[16px] flex item-center gap-2"
                }
                icon={<CiExport />}
                handleOnclick={() => {}}
              >
                Export
              </Button>
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
        {showDes && (
          <Drawer
            onClose={() => setShowDes(false)}
            title={drawerTitle}
            style={showDes ? "block gap-x-5 gap-y-3" : "hidden"}
          >
            <div className="">
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Tên danh mục
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder=""
                  value={nameCategory}
                  onChange={(e) => setNameCategory(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal mt-5"
                >
                  Mô tả danh mục
                </label>
                <textarea
                  required
                  id="text"
                  className="w-full h-[98px] border border-[#e4e6e8] rounded-[8px] p-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal mt-5"
                >
                  Hình ảnh
                </label>
                <div>
                  <input
                    type="file"
                    required
                    ref={inputFileRef}
                    className="w-full p-3 border border-solid border-[#e5e5e5] rounded-[8px] mt-4"
                    onChange={handleFileChange}
                  />
                </div>
                <div className=" mt-5">
                  <div
                    className="w-[120px] h-[90px] rounded-[10px] cursor-pointer relative group"
                    onClick={handleDeleteImage}
                  >
                    <div className="border-solid border-2 border-[#ebebeb] rounded-[10px]">
                      <img
                        className="w-[120px] h-[90px] rounded-[10px]"
                        src={defaultImage}
                        alt="avatar"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 rounded-[10px]">
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-100">
                          <FaRegTrashCan color="#fff" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-5 justify-end">
                <div>
                  <Button
                    style={"bg-[#d42525] text-[#fff] px-6 py-3 text-[16px]"}
                    handleOnclick={handleSubmit}
                  >
                    {isEditMode ? "Update" : "Add New"}
                  </Button>
                </div>
                <div>
                  <Button
                    style={"bg-white text-black py-3 text-[16px]"}
                    handleOnclick={() => {
                      handleDeleteImage();
                      setNameCategory("");
                      setDescription("");
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </Drawer>
        )}
      </div>
    </>
  );
};

export default ManageCategory;
