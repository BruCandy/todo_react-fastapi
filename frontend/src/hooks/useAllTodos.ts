import axios from "axios";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";
import { TodoType } from "../types/api/todo";

export const useAllTodos = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Array<TodoType>>([]);

  const getTodos = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<TodoType>>("http://127.0.0.1:8000/todos")
      .then((res) => setTodos(res.data))
      .catch(() => {
        showMessage({ title: "ユーザー取得に失敗しました。", status: "error" });
      })
      .finally(() => setLoading(false));
  }, [showMessage]);
  return { getTodos, todos, loading };
};
