import { useContext } from "react";
import { apiLogin, apiLogout } from "../utils/api";
import { AuthContext } from "./AuthContext";

const useAuth = () => {
  const { saveUser, logout, user } = useContext(AuthContext);

  const login = async (username) => {
    const result = await apiLogin(username);
    saveUser(result.data);
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
