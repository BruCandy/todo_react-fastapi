import {
  Wrap,
  WrapItem,
  Center,
  Spinner,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useAllTodos } from "../../hooks/useAllTodos";
import { TodoType } from "../../types/api/todo";
import { TodoCard } from "../organisms/todo/TodoCard";
import { TodoDetailModal } from "../organisms/todo/TodoDetailModal";
import { useSelectTodo } from "../../hooks/useSelectTodo";
import styled from "styled-components";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { AddTodoCard } from "../organisms/todo/AddTodoCard";

export const Todo: FC = memo(() => {
  const { getTodos, todos, loading } = useAllTodos();
  const { onSelectTodo, selectedTodo } = useSelectTodo();

  const [modalTodos, setModalTodos] = useState<TodoType[]>([]);
  const [sort, setSort] = useState<string>("priority-high");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  useEffect(() => {
    setModalTodos(todos);
  }, [todos]);

  useEffect(() => {
    sortAndSetTodos(todos, sort);
  }, [todos, sort]);

  const sortAndSetTodos = (todos: TodoType[], sort: string) => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (sort === "priority-high") {
        return Number(b.priority) - Number(a.priority);
      } else if (sort === "priority-low") {
        return Number(a.priority) - Number(b.priority);
      } else if (sort === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return 0;
    });
    setModalTodos(sortedTodos);
  };


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const onClickTodo = useCallback(
    (id: string) => {
      onSelectTodo({ id, todos: modalTodos, onOpen });
    },
    [modalTodos, onSelectTodo, onOpen]
  );

  const completeTodoList = (completeTodo: TodoType) => {
    setModalTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== completeTodo.id)
    );
    getTodos(); 
  };

  const updateTodoList = (updatedTodo: TodoType) => {
    setModalTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    getTodos(); 
  };

  const addTodoList = (addTodo: TodoType) => {
    setModalTodos((prevTodos) => [...prevTodos, addTodo]);
    getTodos(); 
  };

  return (
    <>
      <Sdiv>
        <PPrimaryButton onClick={onAddOpen}>追加</PPrimaryButton>
        <Select
          value={sort}
          onChange={handleSortChange}
          bg={"gray.300"}
          width="130px"
        >
          <option value="priority-high">優先度高い</option>
          <option value="priority-low">優先度低い</option>
          <option value="date">日付</option>
        </Select>
      </Sdiv>

      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {modalTodos.map((todo: TodoType, index) => (
            <WrapItem key={`${todo.id}-${index}`} mx="auto">
              <TodoCard
                id={todo.id}
                todo={todo.todo}
                priority={todo.priority}
                date={todo.date}
                onClick={onClickTodo}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <TodoDetailModal
        todo={selectedTodo}
        isOpen={isOpen}
        onClose={onClose}
        completeTodoList={completeTodoList}
        updateTodoList={updateTodoList}
      />
      <AddTodoCard
        isOpen={isAddOpen}
        onClose={onAddClose}
        addTodoList={addTodoList}
      />
    </>
  );
});

const PPrimaryButton = styled(PrimaryButton)`
  display: block;
  margin: 0 auto;
  text-align: right;
`;
const Sdiv = styled.div`
  display: flex;
`;
