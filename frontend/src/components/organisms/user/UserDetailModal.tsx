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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from "react";
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import axios from "axios";
import { useMessage } from "../../../hooks/useMessage";
import styled from "styled-components";

type Props = {
  user: User | null;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
  updateUserList: (updatedUser: User) => void;
  deleteUserList: (deleteUser: User) => void;
};

export const UserDetailModal: FC<Props> = memo((props) => {
  const { user, isOpen, isAdmin = false, onClose, updateUserList, deleteUserList } = props;

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const { showMessage } = useMessage();

  const usernameInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setUsername(user?.username ?? "");
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phone ?? "");
  }, [user]);

  useEffect(() => {
    setEdit(false);
  }, [isOpen]);

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);

  const onClickEdit = () => {
    setEdit(!edit);
    setTimeout(() => {
      usernameInputRef.current?.focus();
    }, 0);
  };

  const onClickUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const isChanged =
      user?.name !== name ||
      user?.username !== username ||
      user?.email !== email ||
      user?.phone !== phone;

    if (!isChanged) {
      showMessage({ title: "変更がありません", status: "info" });
      onClose();
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/users/${user?.id}`,
        {
          id: user?.id,
          name: name,
          username: username,
          email: email,
          phone: phone,
        }
      );
      showMessage({ title: "更新に成功しました", status: "success" });
      updateUserList(response.data);
      onClose();
      setEdit(!edit);
      const notificationId = Math.floor(Math.random() * 10000).toString() 
      await axios.post("http://127.0.0.1:8000/notifications", {
        id: notificationId,
        message: "userリストが編集されました。"
      })
    } catch (error) {
      showMessage({ title: "更新に失敗しました", status: "error" });
      onClose();
      setEdit(!edit);
    }
  };

  const onClickDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/users/${user?.id}`);
      showMessage({ title: "削除に成功しました", status: "success" });
      deleteUserList(response.data)
      onClose()
      onDeleteClose()
      const notificationId = Math.floor(Math.random() * 10000).toString() 
      await axios.post("http://127.0.0.1:8000/notifications", {
        id: notificationId,
        message: "userリストが更新されました。"
      })
    } catch (error) {
      showMessage({ title: "削除に失敗しました", status: "error" });
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
          <ModalHeader>ユーザー詳細</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onClickUpdate}>
            <ModalBody mx={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>名前</FormLabel>
                  <Input
                    ref={usernameInputRef}
                    value={username}
                    onChange={onChangeUserName}
                    isReadOnly={!edit}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>フルネーム</FormLabel>
                  <Input
                    value={name}
                    onChange={onChangeName}
                    isReadOnly={!edit}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>MAIL</FormLabel>
                  <Input
                    value={email}
                    onChange={onChangeEmail}
                    isReadOnly={!edit}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>TEL</FormLabel>
                  <Input
                    value={phone}
                    onChange={onChangePhone}
                    isReadOnly={!edit}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter gap={4}>
              {isAdmin && !edit && (
                <PrimaryButton onClick={onClickEdit}>編集</PrimaryButton>
              )}
              {edit && <PrimaryButton type="submit">更新</PrimaryButton>}
              {isAdmin && !edit && (
                <PrimaryButton onClick={onDeleteOpen}>削除</PrimaryButton>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent pb={2}>
          <ModalBody mx={4}>
            <Sp>本当に削除しますか？</Sp>
            <br />
            <Button w="100%" onClick={onClickDelete}>
              はい
            </Button>
            <Button w="100%" onClick={onDeleteClose}>
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
