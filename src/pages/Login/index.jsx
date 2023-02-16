import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AlertInfo } from "../../components/AlertInfo";
import api from "../../services/api";
import { setItem } from "../../utils/storage";

import "./styles.css";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    senha: yup.string().required("O campo senha é obrigatório"),
  })
  .required();
const Login = () => {
  const [open, setOpen] = useState(false);
  const [mensagemOculta, setMensagem] = useState("");
  const [accept, setAccept] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function alertMessage(info) {
    setMensagem(info);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2.0 * 1000);
  }

  const onSubmit = async (data) => {
    try {
      const flowData = await api.post("/login", {
        email: data.email,
        senha: data.senha,
      });

      setItem("id", flowData.data.id);
      setItem("nome", flowData.data.nome);
      setItem("token", flowData.data.token);

      setAccept(true);
      alertMessage("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2.0 * 1000);
    } catch (error) {
      setAccept(false);
      alertMessage(error.response.data);
    }
  };

  return (
    <div className="container-login-cadastro">
      <form className="content-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="style-form">Login</h1>
        <div className="content-inputs">
          <label className="style-label" htmlFor="label-email">
            E-mail
          </label>
          <input
            id="label-email"
            type="text"
            className=" input-forms"
            {...register("email")}
          />
          <span className="error-inputs">{errors.email?.message}</span>
        </div>

        <div className="content-inputs">
          <label className="style-label" htmlFor="password-input">
            Senha
          </label>
          <input
            {...register("senha")}
            id="password-input"
            type="password"
            className=" input-forms"
          />
          <span className="error-inputs"> {errors.senha?.message}</span>
        </div>

        <div className="style-change">
          <button className="style-button-form">Login</button>

          <Link className="style-link-react" to="/cadastrar">
            Não tem cadastro? Clique aqui!
          </Link>
        </div>
      </form>
      <AlertInfo open={open} mensagemOculta={mensagemOculta} accept={accept} />
    </div>
  );
};

export default Login;
