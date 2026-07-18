import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Result } from "../types/common";

import type { AboutDTO } from "../types/about";

export const useAbout = () => {

  const addAboutAsync = useMutation({
    mutationFn: async (creds: AboutDTO) => {
      const response = await agent.post<Result<null>>("/about/create",creds);
      return response.data;
    },
  });

  return {
    addAboutAsync
  };
};
