import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenueDrawer } from "../../molecules/MenuDrawer";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";

export const Header: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const onClickHome = useCallback(() => {
    navigate("/home");
    onClose();
  }, []);
  const onClickTodo = useCallback(() => {
    navigate("/home/todo");
    onClose();
  }, []);
  const onClickUserManagement = useCallback(() => {
    navigate("/home/user_management");
    onClose();
  }, []);

  const onClickLogout = useCallback(() => {
    showMessage({ title: "ログアウトしました", status: "success" });
    navigate("/");
  }, []);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            Todo共有アプリ
          </Heading>
        </Flex>

        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link onClick={onClickTodo}>Todoリスト</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickUserManagement}>ユーザー</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickLogout}>ログアウト</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenueDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickTodo={onClickTodo}
        onClickUserManagement={onClickUserManagement}
        onClickLogout={onClickLogout}
      />
    </>
  );
});
