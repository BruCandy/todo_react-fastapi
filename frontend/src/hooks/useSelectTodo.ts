import { useCallback, useState } from "react";
import { TodoType } from "../types/api/todo";

type Props = {
  id: string;
  todos: Array<TodoType>;
  onOpen: () => void;
};

export const useSelectTodo = () => {
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  const onSelectTodo = useCallback((props: Props) => {
    const { id, todos, onOpen } = props;
    const targetTodo = todos.find((task) => task.id === id);
    setSelectedTodo(targetTodo ?? null);
    onOpen();
  }, []);

  return { onSelectTodo, selectedTodo };
};
