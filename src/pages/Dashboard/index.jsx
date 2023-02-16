import Home from "../../components/Home";
import RegisterBar from "../../components/Register";
import "./styles.css";

const Dashboard = () => {
  return (
    <div className="container">
      <RegisterBar />
      <Home />
    </div>
  );
};

export default Dashboard;
