import "./styles.css";

const RegisterBar = () => {
  return (
    <form className="content-register">
      <input
        className="content-input style-font style-placeholder"
        placeholder="Coloque uma URL https://..."
      />
      <button className="style-button">Adicionar</button>
    </form>
  );
};

export default RegisterBar;
