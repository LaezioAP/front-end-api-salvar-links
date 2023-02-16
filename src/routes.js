import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import { getItem } from "./utils/storage";

export default function MainRoutes() {
  const ProtectedRoutes = ({ redirectTo }) => {
    const isAuthenticated = getItem("token");

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  };

  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<RegisterUser />} />
      </Route>

      <Route element={<ProtectedRoutes redirectTo="/login" />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
