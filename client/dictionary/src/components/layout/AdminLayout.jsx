import { Navigate, Outlet } from "react-router-dom";
import { HeaderAdmin, SideBar } from "..";

const AdminLayout = () => {
  return (
    <main>
      <div className="flex">
        <div className="fixed w-[24%] bg-[#fff] h-screen border-r-2 border-gray-100 drop-shadow">
          <SideBar />
        </div>
        <div className="w-[76%] ml-[24%] bg-[#fbfcff]">
          <div>
            <HeaderAdmin />
          </div>
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
