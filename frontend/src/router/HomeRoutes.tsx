import { FC } from "react";
import { Home } from "../components/pages/Home";
import { UserManagement } from "../components/pages/UserManagement";
import { Route, Routes } from "react-router-dom";
import { Page404 } from "../components/pages/Page404";
import { Todo } from "../components/pages/Todo";

export const homeRoutes = [
  {
    path: "/",
    children: <Home />,
  },
  {
    path: "/todo",
    children: <Todo />,
  },
  {
    path: "/user_management",
    children: <UserManagement />,
  },
  {
    path: "*",
    children: <Page404 />,
  },
];

export const HomeRoutes: FC = () => {
  return (
    <Routes>
      {homeRoutes.map((route) => (
        <Route key={route.path} element={route.children} path={route.path} />
      ))}
    </Routes>
  );
};
