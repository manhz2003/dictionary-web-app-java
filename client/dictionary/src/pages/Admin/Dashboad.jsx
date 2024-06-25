import { useState, useRef, useEffect } from "react";
import { Table, Drawer, Button } from "../../components/index";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
const {
  IoIosCreate,
  CiExport,
  FiTrash2,
  LuPencilLine,
  FaRegTrashCan,
  FaUser,
  TbVocabulary,
  FaStackExchange,
  MdOutlineDescription,
} = icons;

const DashBoard = () => {
  const [clearSearch, setClearSeach] = useState("");
  const [showDes, setShowDes] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nameRole, setNameRole] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [userCount, setUserCount] = useState(0);
  const [vocabCount, setVocabCount] = useState(0);
  const [exampleCount, setExampleCount] = useState(0);
  const [descCount, setDescCount] = useState(0);

  useEffect(() => {
    const userInterval = setInterval(() => {
      if (userCount < 2000) {
        setUserCount((prevCount) => prevCount + 4);
      } else {
        clearInterval(userInterval);
      }
    }, 1);

    const vocabInterval = setInterval(() => {
      if (vocabCount < 2000) {
        setVocabCount((prevCount) => prevCount + 4);
      } else {
        clearInterval(vocabInterval);
      }
    }, 1);

    const exampleInterval = setInterval(() => {
      if (exampleCount < 2000) {
        setExampleCount((prevCount) => prevCount + 4);
      } else {
        clearInterval(exampleInterval);
      }
    }, 1);
    const descInterval = setInterval(() => {
      if (descCount < 2000) {
        setDescCount((prevCount) => prevCount + 4);
      } else {
        clearInterval(descInterval);
      }
    }, 1);

    return () => {
      clearInterval(userInterval);
      clearInterval(vocabInterval);
      clearInterval(exampleInterval);
      clearInterval(descInterval);
    };
  }, [userCount, vocabCount, exampleCount, descCount]);
  const inputFileRef = useRef();

  const handleDelete = async (record) => {
    console.log("delete", record);
  };

  const handleEdit = (record) => {
    setFullName(record.fullname);
    setAddress(record.address);
    setPhoneNumber(record.phoneNumber);
    setEmail(record.email);
    setNameRole(record.nameRole);
    setShowDes(true);
    setDrawerTitle("Cập nhật user");
    setIsEditMode(true);
  };

  const handleClearSearch = () => {
    setClearSeach("");
  };

  const handleDeleteImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!fullName || !address || !phoneNumber || !email || !nameRole) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
  };

  const handleCreate = () => {
    setShowDes(true);
    setDrawerTitle("Thêm mới user");
    setIsEditMode(false);
    setFullName("");
    setAddress("");
    setPhoneNumber("");
    setEmail("");
    setNameRole("");
  };

  const column = [
    {
      title: "No",
      key: "no",
      sort: true,
    },
    {
      title: "Họ và tên",
      key: "fullName",
      sort: true,
    },
    {
      title: "Email",
      key: "email",
      sort: true,
    },
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      sort: true,
    },

    {
      title: "Địa chỉ",
      key: "address",
      sort: true,
    },

    {
      title: "Role",
      key: "nameRole",
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
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 2,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 3,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 4,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 5,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 6,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 7,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 8,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 9,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 10,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 11,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
    },
    {
      no: 12,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phoneNumber: "0987739823",
      address: "Hà Nội",
      nameRole: "User",
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
    <div className="bg-[#fff] border-2 border-gray-100 drop-shadow p-5 rounded-[6px]">
      <div className="flex flex-col  border-b-2 border-gray-100 drop-shadow bg-[#fafafa] rounded-[8px] p-3">
        <div className="font-semibold text-[21px]">Dasdboad</div>
        <div className="flex items-center justify-center gap-8 my-4">
          <div className="bg-[#fff] text-[#333] leading-3 text-[20px] rounded-[6px] h-[130px] w-[238px] flex justify-center items-center gap-5">
            <div className="bg-[#08d6b8] p-5 rounded-[100%] ">
              <FaUser size="22px" color="#fff" />
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <div className=" text-[30px] font-bold leading-[22px]">
                {userCount}
              </div>
              <div className="font-semibold leading-[22px]">Người dùng</div>
            </div>
          </div>

          <div className="bg-[#fff] text-[#333] leading-3 text-[20px] rounded-[6px] h-[130px] w-[238px] flex justify-center items-center gap-5">
            <div className="bg-[#ff9b89] p-5 rounded-[100%]">
              <TbVocabulary size="22px" color="#fff" />
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <div className=" text-[30px] font-bold leading-[22px]">
                {vocabCount}
              </div>
              <div className="font-semibold leading-[22px]">Từ vựng</div>
            </div>
          </div>

          <div className="bg-[#fff] text-[#333] leading-3 text-[20px] rounded-[6px] h-[130px] w-[238px] flex justify-center items-center gap-5">
            <div className="bg-[#ffba67] p-5 rounded-[100%]">
              <FaStackExchange size="22px" color="#fff" />
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <div className=" text-[30px] font-bold leading-[22px]">
                {exampleCount}
              </div>
              <div className="font-semibold leading-[22px]">Ví dụ</div>
            </div>
          </div>

          <div className="bg-[#fff] text-[#333] leading-3 text-[20px] rounded-[6px] h-[130px] w-[238px] flex justify-center items-center gap-5">
            <div className="bg-[#d592fe] p-5 rounded-[100%]">
              <MdOutlineDescription size="22px" color="#fff" />
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <div className=" text-[30px] font-bold leading-[22px]">
                {descCount}
              </div>
              <div className="font-semibold leading-[22px]">Mô tả</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center border-b-2 border-gray-100 drop-shadow bg-[#fafafa] rounded-[8px] p-3">
        <div className="font-semibold text-[21px]">Điều khiển</div>
        <div className="flex items-center gap-3">
          <div>
            <Button
              style={
                "bg-[#d42525] text-[#fff] py-3 text-[16px] flex item-center gap-2"
              }
              icon={<IoIosCreate />}
              handleOnclick={handleCreate}
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
      <div className="mt-6 border-t-2 border-gray-100 drop-shadow">
        <Table
          title="Quản lý user"
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
                htmlFor="role"
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Role
              </label>
              <select
                required
                id="role"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                value={nameRole}
                onChange={(e) => setNameRole(e.target.value)}
              >
                <option value="">Phân quyền hạn</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Họ và tên
              </label>
              <input
                required
                type="text"
                id="text"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Email
              </label>
              <input
                required
                type="text"
                id="text"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                placeholder="nguyenvana@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Số điện thoại
              </label>
              <input
                required
                type="text"
                id="text"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                placeholder="0987739823"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Địa chỉ
              </label>
              <input
                required
                type="text"
                id="text"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                placeholder="Địa chỉ của bạn"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
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
                    setFullName("");
                    setAddress("");
                    setPhoneNumber("");
                    setEmail("");
                    setNameRole("");
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
  );
};

export default DashBoard;
