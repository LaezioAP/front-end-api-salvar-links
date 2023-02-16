import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthContext } from "../../providers/auth";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import { AlertInfo } from "../AlertInfo";
import { UserLogin } from "../UserLogin";
import "./styles.css";

const schema = yup
  .object({
    url: yup.string("").required(""),
  })
  .required();

const RegisterBar = () => {
  const hooks = useContext(AuthContext);
  const { getLinks } = hooks.links;

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);
  const [mensagemOculta, setMensagem] = useState("");
  const [accept, setAccept] = useState(false);

  function alertMessage(info) {
    setMensagem(info);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2.0 * 1000);
  }

  const onSubmit = async (data) => {
    try {
      await api.post(
        "/adicionar-url",
        { url: data.url },
        {
          headers: {
            authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
      getLinks();
      setAccept(true);
    } catch (error) {
      setAccept(false);
      alertMessage(error.response.data);
    }
  };

  return (
    <form className="content-register" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-url">
        <input
          type="text"
          className="content-input style-font style-placeholder"
          placeholder="Coloque uma URL https://..."
          {...register("url")}
        />
        <button className="style-button">Adicionar</button>
        <AlertInfo
          open={open}
          mensagemOculta={mensagemOculta}
          accept={accept}
        />
      </div>

      <UserLogin />
    </form>
  );
};

export default RegisterBar;
