import { useState, useCallback } from "react";
import { Table, Drawer, Button, Modal, DragFile } from "../../components/index";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
import { readFileDataImport } from "../../ultils/helper";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
const {
  IoIosCreate,
  CiExport,
  FiTrash2,
  LuPencilLine,
  CiImport,
  IoIosAddCircleOutline,
  CiCircleMinus,
} = icons;

const ManageVocabulary = () => {
  const [clearSearch, setClearSearch] = useState("");
  const [showDes, setShowDes] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [wordType, setWordType] = useState("");
  const [phoneticTranscription, setPhoneticTranscription] = useState("");
  const [explain, setExplain] = useState("");
  const [thumnail, setThumnail] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});
  const [englishExample, setEnglishExample] = useState([""]);
  const [vietnameseExample, setVietnameseExample] = useState([""]);
  const [idCategory, setIdCategory] = useState("");

  // render data for select category
  const categories = [
    { idCategory: 1, nameCategory: "Động vật" },
    { idCategory: 2, nameCategory: "Cây cối, hoa quả" },
    { idCategory: 3, nameCategory: "Đồ vật" },
    { idCategory: 4, nameCategory: "Địa điểm" },
  ];

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = categories.find(
      (category) => category.idCategory === parseInt(selectedId)
    );
    setIdCategory(selectedId);
    setNameCategory(selectedCategory?.nameCategory || "");
  };

  const handleAddEnglish = () => {
    setEnglishExample([...englishExample, ""]);
  };

  const handleAddVietnamese = () => {
    setVietnameseExample([...vietnameseExample, ""]);
  };

  const handleRemoveEnglish = (index) => {
    setEnglishExample(englishExample.filter((_, i) => i !== index));
  };

  const handleRemoveVietNamese = (index) => {
    setVietnameseExample(vietnameseExample.filter((_, i) => i !== index));
  };

  const handleChangeEnglish = (e, index) => {
    const newItems = [...englishExample];
    newItems[index] = e.target.value;
    setEnglishExample(newItems);
  };

  const handleChangeVietnamese = (e, index) => {
    const newItemsV = [...vietnameseExample];
    newItemsV[index] = e.target.value;
    setVietnameseExample(newItemsV);
  };

  const handleDelete = async (record) => {
    console.log("delete", record);
  };

  const handleEdit = (record) => {
    setNameCategory(record.category);
    setEnglish(record.english);
    setVietnamese(record.vietnamese);
    setPhoneticTranscription(record.phoneticTranscription);
    setExplain(record.explain);
    setWordType(record.wordType);
    setThumnail(record.thumnail);
    setEnglishExample(
      Array.isArray(record.englishExample) ? record.englishExample : []
    );
    setVietnameseExample(
      Array.isArray(record.vietnameseExample) ? record.vietnameseExample : []
    );
    setShowDes(true);
    setDrawerTitle("Cập nhật từ điển");
    setIsEditMode(true);
  };

  const handleImportButtonClick = () => {
    if (dataImport) {
      toast.success("Import thành công");
      setShowModal(false);
      setFileName(null);
      setDataPreview([]);
    }
  };

  const handlePreviewData = useCallback(
    (fileValue) => {
      readFileDataImport(fileValue)
        .then((dataMain) => {
          const dataFormat = Array.isArray(dataMain.dataMain)
            ? dataMain.dataMain.map((data) => {
                return {
                  no: data["STT"],
                  vietnamese: data["Tiếng việt"],
                  phoneticTranscription: String(data["Phiên âm"]),
                  english: data["Tiếng Anh"],
                  wordType: data["Loại từ"],
                  englishExample: [data["Đặt câu"]],
                  vietnameseExample: [data["Dịch nghĩa câu"]],
                  explain: data["Giải nghĩa từ"],
                  thumnail: data["link ảnh"],
                  category: nameCategory,
                };
              })
            : [];

          const dataImport = dataFormat.map(({ no, ...rest }) => ({
            ...rest,
            category: idCategory,
          }));

          setDataPreview(dataFormat);
          setDataImport(dataImport);
        })
        .catch((error) => {
          toast.error("File không đúng định dạng !");
        });
    },
    [idCategory, nameCategory]
  );

  const handleClearSearch = () => {
    setClearSearch("");
  };

  const handleSubmit = () => {
    if (!english || !vietnamese || !phoneticTranscription || !explain) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newData = {
      english,
      vietnamese,
      phoneticTranscription,
      explain,
      wordType,
      thumnail,
      category: nameCategory,
      englishExample: [...englishExample],
      vietnameseExample: [...vietnameseExample],
    };

    if (isEditMode) {
      const updatedData = data.map((record) =>
        record.english === english ? { ...newData } : record
      );
      setData(updatedData);
      toast.success("Đã cập nhật từ điển thành công");
    } else {
      const updatedData = [...data, newData];
      setData(updatedData);
      toast.success("Đã thêm mới từ điển thành công");
    }

    setNameCategory("");
    setEnglish("");
    setVietnamese("");
    setPhoneticTranscription("");
    setExplain("");
    setWordType("");
    setThumnail("");
    englishExample([]);
    vietnameseExample([]);
    setShowDes(false);
    setIsEditMode(false);
  };

  const handleAddNew = () => {
    setShowDes(true);
    setDrawerTitle("Thêm mới từ điển");
    setIsEditMode(false);
    setNameCategory("");
    setEnglish("");
    setVietnamese("");
    setPhoneticTranscription("");
    setExplain("");
    setWordType("");
    setThumnail("");
    englishExample([]);
    vietnameseExample([]);
  };

  const column = [
    {
      title: "No",
      key: "no",
      sort: true,
    },
    {
      title: "English",
      key: "english",
      sort: true,
    },
    {
      title: "Vietnamese",
      key: "vietnamese",
      sort: true,
    },
    {
      title: "Phiên âm",
      key: "phoneticTranscription",
      sort: true,
    },
    {
      title: "Giải thích",
      key: "explain",
      sort: true,
    },
    {
      title: "Loại từ",
      key: "wordType",
      sort: true,
    },
    {
      title: "Danh mục",
      key: "category",
      sort: true,
    },
    {
      title: "Ví dụ tiếng anh",
      key: "englishExample",
      render: (text, record) => {
        return (
          <div>
            {Array.isArray(record.englishExample) &&
            record.englishExample.length > 0 ? (
              record.englishExample.map((item, index) => (
                <p key={index}>{`${index + 1}. ${item}`}</p>
              ))
            ) : (
              <p>Không có ví dụ</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Ví dụ tiếng việt",
      key: "vietnameseExample",
      render: (text, record) => {
        return (
          <div>
            {Array.isArray(record.vietnameseExample) &&
            record.vietnameseExample.length > 0 ? (
              record.vietnameseExample.map((item, index) => (
                <p key={index}>{`${index + 1}. ${item}`}</p>
              ))
            ) : (
              <p>Không có ví dụ</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Ảnh mô tả",
      key: "thumnail",
      sort: true,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-3 cursor-pointer">
            <FiTrash2
              color="red"
              onClick={() => handleDelete(record)}
              title="Delete"
            />
            <LuPencilLine
              color="#1677ff"
              onClick={() => handleEdit(record)}
              title="Edit"
            />
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState([
    {
      no: 1,
      english: "banana",
      vietnamese: "Quả chuối",
      phoneticTranscription: "bəˈnæn.ə",
      explain: "Quả chuối là loại quả có vỏ màu vàng",
      wordType: "Danh từ",
      category: "Cây cối, hoa quả",
      thumnail: "ảnh",
      englishExample: ["I like banana", "Banana is yellow", "Banana is sweet"],
      vietnameseExample: [
        "Tôi thích quả chuối",
        "Quả chuối màu vàng",
        "Quả chuối ngọt",
      ],
    },
    {
      no: 2,
      english: "apple",
      vietnamese: "Quả táo",
      phoneticTranscription: "ˈæp.əl",
      explain: "Quả táo có màu đỏ hoặc xanh lá cây",
      wordType: "Danh từ",
      category: "Cây cối, hoa quả",
      thumnail: "ảnh",
      englishExample: ["I eat apple"],
      vietnameseExample: ["Tôi ăn táo"],
    },
    {
      no: 3,
      english: "orange",
      vietnamese: "Quả cam",
      phoneticTranscription: "ˈɔːrɪndʒ",
      explain: "Quả cam có màu da cam",
      wordType: "Danh từ",
      category: "Cây cối, hoa quả",
      thumnail: "ảnh",
      englishExample: ["Orange juice is delicious"],
      vietnameseExample: ["Nước cam rất ngon"],
    },
    {
      no: 4,
      english: "car",
      vietnamese: "Xe ô tô",
      phoneticTranscription: "kɑːr",
      explain: "Xe ô tô là phương tiện giao thông cá nhân",
      wordType: "Danh từ",
      category: "Phương tiện",
      thumnail: "ảnh",
      englishExample: ["Orange juice is delicious"],
      vietnameseExample: ["Nước cam rất ngon"],
    },
  ]);

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
              setClearSearch(e.target.value);
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
      <div className="bg-[#fff] border-2 border-gray-100 drop-shadow p-5 rounded-[6px]">
        <div className="flex justify-between items-center border-b-2 border-gray-100 drop-shadow bg-[#fafafa] rounded-[8px] p-3">
          <div className="font-semibold text-[21px]">Manage vocabulary</div>
          <div className="flex items-center gap-3">
            <div>
              <select
                required
                id="role"
                className="w-full h-[42px] border border-[#e4e6e8] rounded-[8px] px-5 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                value={idCategory}
                onChange={handleSelectChange}
              >
                <option value="">Danh mục</option>
                {categories.map((category) => (
                  <option key={category.idCategory} value={category.idCategory}>
                    {category.nameCategory}
                  </option>
                ))}
              </select>
            </div>
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
                icon={<CiImport />}
                handleOnclick={() => {
                  if (!nameCategory) {
                    toast.error("Vui lòng chọn danh mục trước khi import");
                  } else {
                    setShowModal(true);
                  }
                }}
              >
                Import
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
            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="category"
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Chọn danh mục
                </label>
                <select
                  required
                  id="role"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  value={nameCategory}
                  onChange={(e) => setNameCategory(e.target.value)}
                >
                  <option value="">Danh mục</option>
                  <option value="Động vật">Động vật</option>
                  <option value="Cây cối, hoa quả">Cây cối, hoa quả</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  English
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Banana"
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Vietnamese
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Quả chuối"
                  value={vietnamese}
                  onChange={(e) => setVietnamese(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Phiên âm
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="bəˈnæn.ə"
                  value={phoneticTranscription}
                  onChange={(e) => setPhoneticTranscription(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Giải nghĩa
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Quả chuối là loại quả có vỏ màu vàng"
                  value={explain}
                  onChange={(e) => setExplain(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Loại từ
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Danh từ"
                  value={wordType}
                  onChange={(e) => setWordType(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Link ảnh mô tả
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Địa chỉ của ảnh"
                  value={thumnail}
                  onChange={(e) => setThumnail(e.target.value)}
                />
              </div>
              <div>
                <div
                  className="cursor-pointer flex gap-2 items-center mt-3"
                  onClick={handleAddEnglish}
                >
                  <div>Thêm ví dụ tiếng anh</div>
                  <div className="mt-[2.5px]">
                    <IoIosAddCircleOutline />
                  </div>
                </div>
                {englishExample.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mt-5">
                    <div className="flex items-center gap-3 w-[10%]">
                      <div className="text-[15px] text-[#242938] leading-[20px] font-normal ">
                        Ví dụ {index + 1}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleRemoveEnglish(index)}
                      >
                        <div>
                          <CiCircleMinus />
                        </div>
                      </div>
                    </div>
                    <input
                      required
                      type="text"
                      className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                      placeholder="I like banana"
                      value={item}
                      onChange={(e) => handleChangeEnglish(e, index)}
                    />
                  </div>
                ))}
              </div>

              <div>
                <div
                  className="cursor-pointer flex gap-2 items-center mt-3"
                  onClick={handleAddVietnamese}
                >
                  <div>Thêm ví dụ tiếng việt</div>
                  <div className="mt-[2.5px]">
                    <IoIosAddCircleOutline />
                  </div>
                </div>
                {vietnameseExample.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mt-5">
                    <div className="flex items-center gap-3 w-[10%]">
                      <div className="text-[15px] text-[#242938] leading-[20px] font-normal ">
                        Ví dụ {index + 1}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleRemoveVietNamese(index)}
                      >
                        <div>
                          <CiCircleMinus />
                        </div>
                      </div>
                    </div>
                    <input
                      required
                      type="text"
                      className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                      placeholder="Tôi thích quả chuối"
                      value={item}
                      onChange={(e) => handleChangeVietnamese(e, index)}
                    />
                  </div>
                ))}
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
                      setNameCategory("");
                      setEnglish("");
                      setVietnamese("");
                      setPhoneticTranscription("");
                      setExplain("");
                      setThumnail("");
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
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          title={"Import từ vựng"}
          disableOkBtn={dataPreview?.length < 1}
          onClickBtnOk={handleImportButtonClick}
          textOk={"Import"}
          onClickBtnCancel={() => {
            setShowModal(false);
            setFileName(null);
            setDataPreview([]);
          }}
        >
          <DragFile
            data={dataPreview}
            columns={column}
            onChange={handlePreviewData}
            fileName={fileName}
            setFileName={setFileName}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageVocabulary;
