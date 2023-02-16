import axios from "axios";

export default axios.create({
  baseURL: "https://api-salvar-links.herokuapp.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
