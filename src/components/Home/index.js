import { bd } from "../../dados";
import BasicCard from "../BasicCard";
import "./styles.css";

const Home = () => {
  return (
    <div className="content-home">
      <h1 className="title-home">SEUS LINKS GUARDADOS</h1>

      <div className="cards">
        {bd.map((card) => (
          <div key={card.id}>
            <BasicCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
