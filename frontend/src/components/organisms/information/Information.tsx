import React, { memo, useEffect, useState } from "react";
import { Box, Center, Heading, Spinner, Stack } from "@chakra-ui/react";
import { useAllNotification } from "../../../hooks/useAllNotification";
import { AlertComponent } from "./AlertComponent";
import { Notification } from "../../../types/api/notification";


const Information: React.FC = memo(() => {
  const { getNotifications, notifications, loading } = useAllNotification();
  const [localNotifications, setLocalNotifications] =
    useState<Notification[]>(notifications);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const handleRemove = (id: string) => {
    setLocalNotifications(
      localNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        m={4}
        boxShadow="lg"
        h={300}
        overflowY="scroll"
        bg={"gray.300"}
        w={500}
      >
        <Heading as="h3" size="md" mb={4}>
          通知
        </Heading>
        <Box>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Stack spacing={3}>
              {localNotifications.map((notification: Notification) => (
                <AlertComponent
                  key={notification.id}
                  id={notification.id}
                  message={notification.message}
                  time={notification.time}
                  onRemove={handleRemove}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Box>
  );
});

export default Information;
