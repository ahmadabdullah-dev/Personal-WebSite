import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import ErrorPage from "../../features/errors/ErrorPage";
import NotFound from "../../features/errors/NotFound";
import Projects from "../../features/projects/Projects";
import Project from "../../features/projects/Project";
import Contact from "../../features/contact/Contact";
import Certificates from "../../features/certificates/Certificates";
import Resume from "../../features/resume/Resume";
import RequestLoginForm from "../../features/admin/auth/RequestLoginForm";
import RequireAuth from "./RequireAuth";
import AdminDashboard from "../../features/admin/AdminDashboard";
import CreateProject from "../../features/admin/projects/CreateProject";
import DeleteProject from "../../features/admin/projects/DeleteProject";
import CreateHome from "../../features/admin/home/CreateAbout";
import About from "../../features/about/About";
import Home from "../../features/home/Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "admin", element: <AdminDashboard /> },
          { path: "admin/create-project", element: <CreateProject /> },
          { path: "admin/delete-project", element: <DeleteProject /> },
          { path: "admin/create-about", element: <CreateHome /> },
        ],
      },
      {path: "home", element:<Home />},
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "projects", element: <Projects /> },
      { path: "certificates", element: <Certificates /> },
      { path: "resume", element: <Resume /> },
      { path: "login", element: <RequestLoginForm /> },
      { path: "projects/:slug", element: <Project /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
