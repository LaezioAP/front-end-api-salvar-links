import RegisterBar from "../../components/Register";
import Home from "../../components/Home";
import "./styles.css";

function Dashboard() {
  return (
    <div className="container">
      <RegisterBar />
      <Home />
    </div>
  );
}

export default Dashboard;
