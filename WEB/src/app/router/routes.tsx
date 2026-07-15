import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../../features/errors/ErrorPage";
import NotFound from "../../features/errors/NotFound";
import Projects from "../../features/projects/Projects";
import Project from "../../features/projects/Project";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "projects", element: <Projects /> },
      { path: "projects/:projectName", element: <Project /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);