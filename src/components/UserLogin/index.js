import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { clearItem, getItem } from "../../utils/storage";
import "./styles.css";

export const UserLogin = () => {
  const name = getItem("nome");
  const navigate = useNavigate();

  const handleLogoutPage = () => {
    clearItem();

    navigate("/login");
  };
  return (
    <div className="content-user">
      <AccountCircleIcon sx={{ fontSize: "50px", cursor: "pointer" }} />
      <p>{name}</p>
      <LogoutIcon
        sx={{ fontSize: "30px", cursor: "pointer" }}
        onClick={handleLogoutPage}
      />
    </div>
  );
};
