import { Box, Heading, VStack } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";
import Information from "../organisms/information/Information";
import { HomeCalendar } from "../organisms/todo/HomeCalendar";
import { useAllTodos } from "../../hooks/useAllTodos";

export const Home: FC = memo(() => {
  const { getTodos, todos } = useAllTodos();
  useEffect(() => {
    getTodos()
  }, [getTodos])
  
  return (
    <Box p={4}>
      <Heading>Home</Heading>
      <VStack spacing={8} align="start">
        <HomeCalendar todos={todos} />
        <Information />
      </VStack>
    </Box>
  );
});
