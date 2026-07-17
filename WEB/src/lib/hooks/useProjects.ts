import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import type { CreateProjectDTO } from "../types/projects";

export const useProjects = () => {
 
  const createProjectAsync = useMutation({
    mutationFn: async (creds: CreateProjectDTO) => {
        const response = await agent.post("/projects/create", creds);
        return response.data;
    },
  });

  return {
     createProjectAsync,
  };
};
