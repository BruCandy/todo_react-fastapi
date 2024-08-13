import axios from "axios";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";
import { Notification } from "../types/api/notification";

export const useAllNotification = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  const getNotifications = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<Notification>>("http://127.0.0.1:8000/notifications")
      .then((res) => setNotifications(res.data))
      .catch(() => {
        showMessage({ title: "通知取得に失敗しました。", status: "error" });
      })
      .finally(() => setLoading(false));
  }, []);
  return { getNotifications, notifications, loading };
};
