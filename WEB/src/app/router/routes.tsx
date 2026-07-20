import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import ErrorPage from "../../features/errors/ErrorPage";
import NotFound from "../../features/errors/NotFound";
import Projects from "../../features/projects/Projects";
import Project from "../../features/projects/Project";
import Contact from "../../features/contact/CreateContact";
import RequestLoginForm from "../../features/admin/auth/RequestLoginForm";
import RequireAuth from "./RequireAuth";
import AdminDashboard from "../../features/admin/AdminDashboard";
import CreateProject from "../../features/admin/projects/CreateProject";
import DeleteProject from "../../features/admin/projects/DeleteProject";
import CreateHome from "../../features/admin/home/CreateHome";
import About from "../../features/about/About";
import Home from "../../features/home/Home";
import UpdateHome from "../../features/admin/home/UpdateHome";
import DeleteHome from "../../features/admin/home/DeleteHome";
import UpdateProject from "../../features/admin/projects/UpdateProject";
import Contacts from "../../features/admin/contact/Contacts";
import DeleteSkill from "../../features/admin/about/Skills/DeleteSkill";
import CreateSkill from "../../features/admin/about/Skills/CreateSkill";

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
          { path: "admin/update-project", element: <UpdateProject /> },
          { path: "admin/create-home", element: <CreateHome /> },
          { path: "admin/update-home", element: <UpdateHome /> },
          { path: "admin/delete-home", element: <DeleteHome /> },
          { path: "admin/contacts", element: <Contacts /> },
          { path: "admin/create-skill", element: <CreateSkill /> },
          { path: "admin/delete-skill", element: <DeleteSkill /> },
        ],
      },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "projects", element: <Projects /> },
      { path: "login", element: <RequestLoginForm /> },
      { path: "projects/:slug", element: <Project /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
