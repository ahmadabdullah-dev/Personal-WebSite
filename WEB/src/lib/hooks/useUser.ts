import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Result } from "../types/common";
import type { UserDTO } from "../types/user";

export const useUser = () => {
  const currentUser = useQuery({
    queryKey: ["currentUser"],
    queryFn: () =>
      agent.get<Result<UserDTO>>("/user/current").then((res) => res.data),
    staleTime: 5 * 60 * 1000, // cache for 5 min
    retry: false,
  });

  return {
    currentUser,
  };
};
