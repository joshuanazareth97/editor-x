import { useContext } from "react";
import { apiLogin, apiLogout } from "../utils/api";
import { AuthContext } from "./AuthContext";

const useAuth = () => {
  const { saveUser, logout, user } = useContext(AuthContext);

  const login = (username) => {
    apiLogin(username).then((result) => {
      saveUser(result.data);
    });
  };

  return {
    user,
    login,
    logout: () => {
      logout();
      apiLogout();
    },
  };
};

export default useAuth;
