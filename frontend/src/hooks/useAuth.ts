import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback((id: string) => {
    setLoading(true);
    axios
      .get<User>(`http://127.0.0.1:8000/users/${id}`)
      .then((res) => {
        if (res.data) {
          const isAdmin = res.data.id === "10" ? true : false;
          setLoginUser({ ...res.data, isAdmin });
          // setIsAuthenticated(true);
          showMessage({ title: "ログインしました", status: "success" });
          navigate("/home");
        } else {
          showMessage({ title: "ユーザーが見つかりません", status: "error" });
          setLoading(false);
        }
      })
      .catch(() => {
        showMessage({ title: "ログインできません", status: "error" });
        setLoading(false);
      });
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    showMessage({ title: "ログアウトしました", status: "success" });
    navigate("/login");
  }, [navigate, showMessage]);

  return { login, logout, isAuthenticated, loading };
};
