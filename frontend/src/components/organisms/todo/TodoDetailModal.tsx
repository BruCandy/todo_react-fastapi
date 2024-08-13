import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from "react";
import { TodoType } from "../../../types/api/todo";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import styled from "styled-components";
import axios from "axios";
import { useMessage } from "../../../hooks/useMessage";
import { Calendar } from "./TodoCalendar";

type Props = {
  todo: TodoType | null;
  isOpen: boolean;
  onClose: () => void;
  completeTodoList: (deleteUser: TodoType) => void;
  updateTodoList: (deleteUser: TodoType) => void;
};

export const TodoDetailModal: FC<Props> = memo((props) => {
  const { todo, isOpen, onClose, completeTodoList, updateTodoList } = props;

  const { showMessage } = useMessage();

  const {
    isOpen: isCompleteOpen,
    onOpen: onCompleteOpen,
    onClose: onCompleteClose,
  } = useDisclosure();

  const todoRef = useRef<HTMLInputElement>(null);

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [detail, setDetail] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log("Setting values from todo", todo);
    setTask(todo?.todo ?? "");
    setPriority(todo?.priority ?? "");
    setDate(todo?.date ?? "");
    setDetail(todo?.detail ?? "");
  }, [todo]);

  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);
  const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) =>
    setPriority(e.target.value);
  const onChangeDate = (date: string | null) => setDate(date ?? "");
  const onChangeDetail = (e: ChangeEvent<HTMLInputElement>) =>
    setDetail(e.target.value);

  const onClickEdit = () => {
    setEdit(!edit);
    setTimeout(() => {
      todoRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    setEdit(false);
  }, [isOpen]);

  const onClickComplete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/todos/${todo?.id}`
      );
      showMessage({ title: "お疲れ様です", status: "success" });
      completeTodoList(response.data);
      onClose();
      onCompleteClose();
      // const now = new Date();
      // const formattedTime = now.toLocaleString('ja-JP', {
      //   year: 'numeric',
      //   month: '2-digit',
      //   day: '2-digit',
      //   hour: '2-digit',
      //   minute: '2-digit',
      //   second: '2-digit'
      // });
      const notificationId = Math.floor(Math.random() * 10000).toString() 
      await axios.post("http://127.0.0.1:8000/notifications", {
        id: notificationId,
        message: "todoリストが更新されました。"
        // time:formattedTime
      })
    } catch (error) {
      showMessage({ title: "完了に失敗しました", status: "error" });
    }
  };

  const onClickUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const isChanged =
      todo?.todo !== task ||
      todo?.priority !== priority ||
      todo?.date !== date ||
      todo?.detail !== detail;

    if (!isChanged) {
      showMessage({ title: "変更がありません", status: "info" });
      onClose();
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/todos/${todo?.id}`,
        {
          id: todo?.id,
          todo: task,
          priority: priority,
          date: date,
          detail: detail,
        }
      );
      showMessage({ title: "更新に成功しました", status: "success" });
      updateTodoList(response.data);
      onClose();
      // const now = new Date();
      // const formattedTime = now.toLocaleString('ja-JP', {
      //   year: 'numeric',
      //   month: '2-digit',
      //   day: '2-digit',
      //   hour: '2-digit',
      //   minute: '2-digit',
      //   second: '2-digit'
      // });
      const notificationId = Math.floor(Math.random() * 10000).toString() 
      await axios.post("http://127.0.0.1:8000/notifications", {
        id: notificationId,
        message: "todoリストが編集されました。"
        // time:formattedTime
      })
      setEdit(!edit);
    } catch (error) {
      showMessage({ title: "更新に失敗しました", status: "error" });
      onClose();
      setEdit(!edit);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent pb={2}>
          <ModalHeader>ToDo詳細</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onClickUpdate}>
            <ModalBody mx={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Task</FormLabel>
                  <Input
                    ref={todoRef}
                    value={task}
                    onChange={onChangeTask}
                    isReadOnly={!edit}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Primary</FormLabel>
                  <Select
                    value={priority}
                    onChange={onChangePriority}
                    disabled={!edit}
                  >
                    <option value="1">★</option>
                    <option value="2">★★</option>
                    <option value="3">★★★</option>
                    <option value="4">★★★★</option>
                    <option value="5">★★★★★</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  {edit ? (
                    <Calendar setDate={onChangeDate} />
                  ) : (
                    <Input value={date} isReadOnly />
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Detail</FormLabel>
                  <Input
                    value={detail}
                    onChange={onChangeDetail}
                    isReadOnly={!edit}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter gap={4}>
              {!edit && (
                <PrimaryButton onClick={onClickEdit}>編集</PrimaryButton>
              )}
              {edit && <PrimaryButton type="submit">更新</PrimaryButton>}
              {!edit && (
                <PrimaryButton onClick={onCompleteOpen}>完了</PrimaryButton>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCompleteOpen} onClose={onCompleteClose}>
        <ModalOverlay />
        <ModalContent pb={2}>
          <ModalBody mx={4}>
            <Sp>完了しましたか？</Sp>
            <br />
            <Button w="100%" onClick={onClickComplete}>
              はい
            </Button>
            <Button w="100%" onClick={onCompleteClose}>
              いいえ
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

const Sp = styled.p`
  color: red;
  font-size: 24px;
  text-align: center;
`;
