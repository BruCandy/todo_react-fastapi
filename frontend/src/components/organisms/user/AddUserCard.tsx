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
  Stack,
} from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import axios from "axios";
import { useMessage } from "../../../hooks/useMessage";
import { User } from "../../../types/api/user";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  addUserList: (updatedUser: User) => void;
};

export const AddUserCard: FC<Props> = memo((props) => {
  const { isOpen, onClose, addUserList } = props;

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { showMessage } = useMessage();

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>("#id-input");
        input?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    setId("");
    setUsername("");
    setName("");
    setEmail("");
    setPhone("");
  }, [isOpen]);

  const onClickAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFilled =
      id === "" ||
      name === "" ||
      username === "" ||
      email === "" ||
      phone === "";

    if (isFilled) {
      showMessage({ title: "情報が不足しています", status: "error" });
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/users", {
        id: id,
        name: name,
        username: username,
        email: email,
        phone: phone,
      });
      addUserList(response.data);
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
        message: "userリストが更新されました。"
        // time:formattedTime
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
                <FormLabel>ID</FormLabel>
                <Input
                  id="id-input"
                  placeholder="ID"
                  value={id}
                  onChange={onChangeId}
                />
              </FormControl>
              <FormControl>
                <FormLabel>名前</FormLabel>
                <Input
                  placeholder="名前"
                  value={username}
                  onChange={onChangeUserName}
                />
              </FormControl>
              <FormControl>
                <FormLabel>フルネーム</FormLabel>
                <Input
                  placeholder="フルネーム"
                  value={name}
                  onChange={onChangeName}
                />
              </FormControl>
              <FormControl>
                <FormLabel>MAIL</FormLabel>
                <Input
                  placeholder="MAIL"
                  value={email}
                  onChange={onChangeEmail}
                />
              </FormControl>
              <FormControl>
                <FormLabel>TEL</FormLabel>
                <Input
                  placeholder="TEL"
                  value={phone}
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
