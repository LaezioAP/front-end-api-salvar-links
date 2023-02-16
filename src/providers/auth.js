import { createContext } from "react";
import { useLinks } from "./getLinks";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const links = useLinks();
  return (
    <AuthContext.Provider value={{ links }}>
      {props.children}
    </AuthContext.Provider>
  );
};
