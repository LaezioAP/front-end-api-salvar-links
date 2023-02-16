import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import { setItem } from "../../utils/storage";
import "./styles.css";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("O E-mail é obrigatório"),
    senha: yup.string().required("O campo senha é obrigatório"),
  })
  .required();
const Login = () => {
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
      const flowData = await api.post("/login", {
        email: data.email,
        senha: data.senha,
      });

      setItem("id", flowData.data.id);
      setItem("nome", flowData.data.nome);
      setItem("token", flowData.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data);
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
          <button className="style-button-form">Cadastrar</button>

          <Link className="style-link-react" to="/cadastrar">
            Não tem cadastro? Clique aqui!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
