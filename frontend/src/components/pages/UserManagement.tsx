import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useLoginUser } from "../../hooks/useLoginUser";
import { User } from "../../types/api/user";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import styled from "styled-components";
import { AddUserCard } from "../organisms/user/AddUserCard";

export const UserManagement: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();

  const [modalUsers, setModalUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    setModalUsers(users);
  }, [users]);

  const onClickUser = useCallback(
    (id: string) => {
      onSelectUser({ id, users: modalUsers, onOpen });
    },
    [modalUsers, onSelectUser, onOpen]
  );

  const updateUserList = (updatedUser: User) => {
    setModalUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    getUsers();
  };

  const addUserList = (updatedUser: User) => {
    setModalUsers((prevUsers) => [...prevUsers, updatedUser]);
    getUsers();
  };

  const deleteUserList = (deleteUser: User) => {
    setModalUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deleteUser.id)
    );
    getUsers();
  };

  return (
    <>
      {loginUser?.isAdmin && (
        <PPrimaryButton onClick={onAddOpen}>追加</PPrimaryButton>
      )}
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {modalUsers.map((user: User) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="/images/figure.jpg"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        user={selectedUser}
        isOpen={isOpen}
        isAdmin={loginUser?.isAdmin}
        onClose={onClose}
        updateUserList={updateUserList}
        deleteUserList={deleteUserList}
      />
      <AddUserCard
        isOpen={isAddOpen}
        onClose={onAddClose}
        addUserList={addUserList}
      />
    </>
  );
});

const PPrimaryButton = styled(PrimaryButton)`
  display: block;
  margin: 0 auto;
  text-align: right;
`;
