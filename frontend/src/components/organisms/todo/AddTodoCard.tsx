import {
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
} from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import axios from "axios";
import { useMessage } from "../../../hooks/useMessage";
import { TodoType } from "../../../types/api/todo";
import { Calendar } from "./TodoCalendar";
import { format } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  addTodoList: (updatedTodo: TodoType) => void;
};

export const AddTodoCard: FC<Props> = memo((props) => {
  const { isOpen, onClose, addTodoList } = props;

  const [id, setId] = useState("");
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [detail, setDetail] = useState("");

  const { showMessage } = useMessage();

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);
  const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) =>
    setPriority(e.target.value);
  const onChangeDate = (date: string | null) => setDate(date ?? "");
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) =>
    setDetail(e.target.value);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>("#task-input");
        input?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    setId(Math.floor(Math.random() * 10000).toString());
    setTask("");
    setPriority("");
    setDetail("");
    const today = new Date();
    const formattedDate = format(today, "yyyy/M/d"); 
    setDate(formattedDate);
  }, [isOpen]);

  const onClickAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFilled =
      task === "" || priority === "" || date === "" || detail === "";

    if (isFilled) {
      showMessage({ title: "情報が不足しています", status: "error" });
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/todos", {
        id: id,
        todo: task,
        priority: priority,
        date: date,
        detail: detail,
      });
      addTodoList(response.data);
      showMessage({ title: "追加に成功しました", status: "success" });
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
        message: "todoリストが更新されました。"
        // time: formattedTime
      })
    } catch (error) {
      showMessage({ title: "追加に失敗しました", status: "error" });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>追加情報</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onClickAdd}>
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Task</FormLabel>
                <Input
                  id="task-input"
                  placeholder="Task"
                  value={task}
                  onChange={onChangeUserName}
                />
              </FormControl>
              <FormControl>
                <FormLabel>重要度</FormLabel>
                <Select
                  placeholder="選択してください"
                  value={priority}
                  onChange={onChangePriority}
                >
                  <option key="priority-1" value="1">
                    ★
                  </option>
                  <option key="priority-2" value="2">
                    ★★
                  </option>
                  <option key="priority-3" value="3">
                    ★★★
                  </option>
                  <option key="priority-4" value="4">
                    ★★★★
                  </option>
                  <option key="priority-5" value="5">
                    ★★★★★
                  </option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Calendar setDate={onChangeDate} />
              </FormControl>
              <FormControl>
                <FormLabel>Detail</FormLabel>
                <Input
                  placeholder="詳細"
                  value={detail}
                  onChange={onChangePhone}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton type="submit">追加</PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});
