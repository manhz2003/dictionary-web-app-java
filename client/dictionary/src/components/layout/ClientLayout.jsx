import { Header, Footer } from "..";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../ultils/path";

const ClientLayout = () => {
  return (
    <main>
      <Header />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default ClientLayout;
