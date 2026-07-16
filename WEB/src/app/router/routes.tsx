import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../../features/errors/ErrorPage";
import NotFound from "../../features/errors/NotFound";
import Projects from "../../features/projects/Projects";
import Project from "../../features/projects/Project";
import About from "../../features/about/About";
import Contact from "../../features/contact/Contact";
import Certificates from "../../features/certificates/Certificates";
import Resume from "../../features/resume/Resume";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:projectName", element: <Project /> },
      { path: "certificates", element: <Certificates /> },
      {path: "resume", element: <Resume />}
    ],
  },
  { path: "*", element: <NotFound /> },
]);