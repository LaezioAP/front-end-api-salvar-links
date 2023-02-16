import { useState } from "react";
import api from "../services/api";
import { getItem } from "../utils/storage";

export function useLinks() {
  const [registros, setRegistros] = useState();
  async function getLinks() {
    try {
      const flowData = await api.get("/dashboard", {
        headers: {
          authorization: `Bearer ${getItem("token")}`,
        },
      });

      setRegistros(flowData.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return {
    getLinks,
    registros,
    setRegistros,
  };
}
