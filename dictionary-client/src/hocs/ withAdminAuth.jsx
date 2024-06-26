import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import path from "../ultils/path";

const AdminRoute = ({ element }) => {
  const { user } = useAuth();

  const isAdmin = user && user.roles.some((role) => role.nameRole === "Admin");

  if (!isAdmin) {
    return <Navigate to={path.NOT_FOUND} />;
  }

  return element;
};

export default AdminRoute;
