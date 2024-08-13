import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";
import axios from "axios";
import { FC, memo } from "react";

type Props = {
  id: string;
  message: string;
  time: string;
  onRemove: (id: string) => void;
};

export const AlertComponent: FC<Props> = memo((props) => {
  const { id, message, time, onRemove } = props;

  const onClick = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/notifications/${id}`);
      onRemove(id);
    } catch (error) {console.error(error);}
  };

  return (
    <Alert status="success" w={"410px"}>
      <AlertIcon />
      {time}に{message}
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClick}
      />
    </Alert>
  );
});
