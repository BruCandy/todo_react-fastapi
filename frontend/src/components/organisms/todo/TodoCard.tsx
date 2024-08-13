import { Box, Stack, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
  id:string
  todo: string;
  priority: string;
  date: string;
  onClick: (todo: string) => void;
};

export const TodoCard: FC<Props> = memo((props) => {
  const {id,  todo, priority, date, onClick } = props;

  return (
    <Box
      w="260px"
      h="110px"
      bg="gray.300"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign={"center"}>
        <Text fontSize="lg" fontWeight="bold">
          {todo}
        </Text>
        <Text fontSize="sm">
          重要度　
          {priority === "5"
            ? <Sspan>★★★★★</Sspan>
            : priority === "4"
            ? <Sspan>★★★★</Sspan>
            : priority === "3"
            ? <Sspan>★★★</Sspan>
            : priority === "2"
            ? <Sspan>★★</Sspan>
            : <Sspan>★</Sspan>}
        </Text>
        <Text fontSize="sm" color="red">
          期限　{date}
        </Text>
      </Stack>
    </Box>
  );
});

const Sspan = styled.span`
  color: yellow;
`