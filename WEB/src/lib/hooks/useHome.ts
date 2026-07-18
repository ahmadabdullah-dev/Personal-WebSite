import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { HomeDTO } from "../types/home";
import type { Result } from "../types/common";

export const useHome = () => {
  const addHomeAsync = useMutation({
    mutationFn: async (creds: HomeDTO) => {
      const response = await agent.post("/home/create", creds);
      return response.data;
    },
  });
  const readHomeAsync = useQuery({
    queryKey: ["home"],
    queryFn: async () =>
      await agent.get<Result<HomeDTO>>("/home/read").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
  return {
     addHomeAsync,
     readHomeAsync,
  };
};
