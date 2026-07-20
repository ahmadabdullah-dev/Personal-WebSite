import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Result } from "../types/common";
import type { AboutDTO } from "../types/about";

export const useAbout = () => {
  const addAboutAsync = useMutation({
    mutationFn: async (creds: AboutDTO) => {
      const response = await agent.post("/about/create", creds);
      return response.data;
    },
  });
  const readAboutAsync = useQuery({
    queryKey: ["about"],
    queryFn: async () =>
      await agent.get<Result<AboutDTO>>("/about/read").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const updateAboutAsync = useMutation({
    mutationFn: async (creds: AboutDTO) => {
      const response = await agent.put("/about/update", creds);
      return response.data;
    },
  });
  const deleteAboutAsync = useMutation({
    mutationFn: async () => {
      const response = await agent.delete("/about/delete");
      return response.data;
    },
  });
  return {
    addAboutAsync,
    updateAboutAsync,
    deleteAboutAsync,
    readAboutAsync
  };
};
