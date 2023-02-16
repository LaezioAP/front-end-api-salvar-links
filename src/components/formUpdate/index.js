import { useContext, useState } from "react";
import { AuthContext } from "../../providers/auth";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./styles.css"

export const UpdateRegister = ({ idCard, handleClose }) => {
  const hooks = useContext(AuthContext);
  const { getLinks } = hooks.links;
  const [inputUrl, setInputUrl] = useState("");
  const [inputTitle, setInputTitle] = useState("");

  const handleChangeUrl = (event) => {
    setInputUrl(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setInputTitle(event.target.value);
  };

  const updateRegister = async (event) => {
    event.preventDefault();

    if (!inputUrl && !inputTitle.titulo) {
      return console.log("Pelo menos um campo deve ser preenchido!");
    }
    
    try {
      const { data } = await api.put(
        `/dashboard/${idCard}`,
        {
          url: inputUrl,
          title: inputTitle,
        },
        {
          headers: {
            authorization: `Bearer ${getItem("token")}`,
          },
        }
      );

      getLinks();
      handleClose()
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <form className="form-update-URL" onSubmit={updateRegister}>
      <h1 className="style-form">Editar URL</h1>
      <div className="content-inputs">
        <label className="style-label" htmlFor="label-url">
          URL
        </label>
        <input
          name="url"
          id="label-url"
          type="text"
          className=" input-forms"
          placeholder="Coloque uma URL https://..."
          onChange={handleChangeUrl}
        />
      </div>

      <div className="content-inputs">
        <label className="style-label" htmlFor="label-title">
          Título
        </label>
        <input
          name="titulo"
          id="label-title"
          type="text"
          className=" input-forms"
          placeholder="Adicione um título..."
          onChange={handleChangeTitle}
        />
      </div>

      <button className="style-button-form">
        Salvar
      </button>
    </form>
  );
};
