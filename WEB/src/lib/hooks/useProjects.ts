import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { CreateProjectDTO, DeleteProjectDTO, ProjectDTO } from "../types/projects";
import type { PaginatedList, PaginationParams, Result } from "../types/common";

export const useProjects = (pagination?: PaginationParams, slug?: string) => {
   const queryClient = useQueryClient();

  const createProjectAsync = useMutation({
    mutationFn: async (creds: CreateProjectDTO) => {
      const response = await agent.post("/projects/create", creds);
      return response.data;
    },
  });

  const getProjectsAsync = useQuery({
    queryKey: ["projects", pagination?.page, pagination?.pageSize],
    queryFn: async () =>
    await agent.get<Result<PaginatedList<ProjectDTO>>>("/projects/all", { params: pagination }).then((res) => res.data),
    enabled: !!pagination,
    staleTime: 5 * 60 * 1000,
  });

  const getProjectBySlugAsync = useQuery({
    queryKey: ["project", slug],
    queryFn: async () =>
    await agent.get<Result<ProjectDTO>>(`/projects/slug?slug=${encodeURIComponent(slug!)}`).then((res) => res.data),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  const deleteProjectBySlugAsync = useMutation({
    mutationFn: async (creds: DeleteProjectDTO) => {
    const response = await agent.delete(`/projects/${encodeURIComponent(creds.slug!)}`);
    return response.data;
    },
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["project", variables.slug] });
      },
    });
  return {
    createProjectAsync,
    getProjectsAsync,
    getProjectBySlugAsync,
    deleteProjectBySlugAsync
  };
};
