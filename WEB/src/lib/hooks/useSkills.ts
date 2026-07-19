import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { SkillDTO } from "../types/skills";
import type { Result } from "../types/common";

export const useSkills = () => {
   const queryClient = useQueryClient();

    const readSkillsAsync = useQuery({
    queryKey: ["skills"],
    queryFn: async () => await agent.get<Result<SkillDTO[]>>("/skills/all").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    });

    const deleteSkillAsync = useMutation({
    mutationFn: async (creds: SkillDTO) => {
    const response = await agent.delete("/skills/delete",creds);
    return response.data;
    },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["skills"] });
      },
    });
    
    const createSkillAsync = useMutation({
    mutationFn: async (creds: SkillDTO) => {
     const response = await agent.post("/skills/create", creds);
     return response.data;
      },
    });
return {
    readSkillsAsync,
    deleteSkillAsync,
    createSkillAsync
  };

}