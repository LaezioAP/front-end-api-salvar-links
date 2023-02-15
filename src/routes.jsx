import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<RegisterUser />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default MainRoutes;
