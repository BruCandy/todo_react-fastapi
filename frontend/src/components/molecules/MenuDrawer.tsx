import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
  onClickTodo: () => void;
  onClickUserManagement: () => void;
  onClickLogout: () => void;
};

export const MenueDrawer: FC<Props> = memo((props) => {
  const {
    onClose,
    isOpen,
    onClickHome,
    onClickTodo,
    onClickUserManagement,
    onClickLogout,
  } = props;

  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure();

  return (
    <>
      {" "}
      <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0} bg="gray.100">
              <Button w="100%" onClick={onClickHome}>
                TOP
              </Button>
              <Button w="100%" onClick={onClickTodo}>
                Todoリスト
              </Button>
              <Button w="100%" onClick={onClickUserManagement}>
                ユーザー
              </Button>
              <Button w="100%" onClick={onLogoutOpen}>
                ログアウト
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Modal isOpen={isLogoutOpen} onClose={onLogoutClose}>
        <ModalOverlay />
        <ModalContent pb={2}>
          <ModalBody mx={4}>
            <Sp>ログアウトしますか？</Sp>
            <br />
            <Button w="100%" onClick={onClickLogout}>
              はい
            </Button>
            <Button w="100%" onClick={onLogoutClose}>
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
