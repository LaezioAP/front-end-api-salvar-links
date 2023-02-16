import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/auth";
import BasicCard from "../BasicCard";
import "./styles.css";

const Home = () => {
  const dados = useContext(AuthContext);
  const { getLinks, registros } = dados.links;

  useEffect(() => {
    getLinks();
  }, []);

  useEffect(() => {}, [registros]);

  return (
    <div className="content-home">
      <h1 className="title-home">SEUS LINKS GUARDADOS</h1>

      <div className="cards">
        {registros &&
          registros.map((card) => <BasicCard key={card.id} card={card} />)}
      </div>
    </div>
  );
};

export default Home;
