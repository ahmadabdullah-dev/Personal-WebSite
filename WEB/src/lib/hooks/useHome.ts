import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { AddHomeFiles, CreateHomeDTO, HomeDTO, UpdateHomeDTO } from "../types/home";
import type { Result } from "../types/common";

export const useHome = () => {
  
  const addHomeAsync = useMutation({
    mutationFn: async (creds: CreateHomeDTO) => {
      const response = await agent.post("/home/create", creds);
      return response.data;
    },
  });

  const readHomeAsync = useQuery({
    queryKey: ["home"],
    queryFn: async () =>
      await agent.get<Result<HomeDTO>>("/home/read").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: false
  });
  
  const updateHomeAsync = useMutation({
     mutationFn: async (creds: UpdateHomeDTO) => {
       const response = await agent.put("/home/update", creds);
       return response.data;
     },
   });
  
   const addHomeFilesAsync = useMutation({
    mutationFn: async (creds: AddHomeFiles) => {
      const formData = new FormData();

      if (creds.homeImage) {
        formData.append("HomeImage", creds.homeImage);
      }
      if (creds.cv) {
        formData.append("CV", creds.cv);
      }

      const response = await agent.post("/home/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });

  const deleteHomeAsync = useMutation({
      mutationFn: async () => {
        const response = await agent.delete("/home/delete");
        return response.data;
      },
    });
  return {
     addHomeAsync,
     readHomeAsync,
     updateHomeAsync,
     deleteHomeAsync,
     addHomeFilesAsync
  };
};
