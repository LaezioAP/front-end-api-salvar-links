import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthContext } from "../../providers/auth";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
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

  const onSubmit = async (data) => {
    try {
      const flowData = await api.post(
        "/adicionar-url",
        { url: data.url },
        {
          headers: {
            authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
      getLinks();
      console.log(flowData.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form className="content-register" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="content-input style-font style-placeholder"
        placeholder="Coloque uma URL https://..."
        {...register("url")}
      />
      <button className="style-button">Adicionar</button>
    </form>
  );
};

export default RegisterBar;
