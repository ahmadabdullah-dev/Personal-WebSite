import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { LoginDTO, RequestLoginDTO } from "../types/auth";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const requestLoginAsync = useMutation({
    mutationFn: async (creds: RequestLoginDTO) => {
      const response = await agent.post("/auth/request-login", creds);
      return response.data;
    }, 
  });

  const loginAsync = useMutation({
    mutationFn: async (creds: LoginDTO) => {
      const response = await agent.post("/auth/login", creds);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/admin");
    },
  });
const logoutAsync = useMutation({
  mutationFn: async () => {
    await agent.post("/auth/logout");
  },
  onSuccess: async () => {
   await queryClient.removeQueries({ queryKey: ["currentUser"] });
    navigate("/");
  },
});
  return {
    requestLoginAsync,
    loginAsync,
    logoutAsync
  };
};
