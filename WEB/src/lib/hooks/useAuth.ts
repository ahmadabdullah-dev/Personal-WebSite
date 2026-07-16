import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import type { LoginDTO, RequestLoginDTO } from "../types/auth";
import { useNavigate } from "react-router";

export const useAuth = () => {

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
      navigate("/admin");
    },
  });

  return {
    requestLoginAsync,
    loginAsync
  };
};
