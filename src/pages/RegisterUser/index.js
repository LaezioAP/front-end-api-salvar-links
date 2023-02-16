import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";

import "./styles.css";

const schema = yup
  .object({
    nome: yup.string().required("O nomo é obrigatório"),
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    senha: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 digitos")
      .required("O campo senha é obrigatório"),
    confirmarSenha: yup
      .string()
      .required("Confirmar a senha é obrigatório")
      .oneOf([yup.ref("senha")], "As senhas devem ser identicas"),
  })
  .required();

const RegisterUser = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/cadastrar-usuario", {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      });

      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container-login-cadastro">
      <form className="content-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="style-form">Cadastre-se</h1>

        <div className=" content-inputs">
          <label className="style-label" htmlFor="label-name">
            Nome
          </label>
          <input
            id="label-name"
            type="text"
            className="input-forms"
            {...register("nome")}
          />
          <span className="error-inputs">{errors.nome?.message}</span>
        </div>

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
          <span className="error-inputs">{errors.senha?.message}</span>
        </div>

        <div className="content-inputs">
          <label className="style-label" htmlFor="passwordConfirmed">
            Confirmação de senha
          </label>
          <input
            {...register("confirmarSenha")}
            id="passwordConfirmed"
            type="password"
            className="input-forms width-height"
          />
          <span className="error-inputs">{errors.confirmarSenha?.message}</span>
        </div>

        <div className="style-change">
          <button className="style-button-form">Cadastrar</button>
          <Link className="style-link-react" to="/login">
            Já tem cadastro? Clique aqui!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
