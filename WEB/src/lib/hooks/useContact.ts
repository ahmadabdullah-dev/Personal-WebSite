import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { PaginatedList, PaginationParams, Result } from "../types/common";
import type { ContactDTO, CreateContactDTO } from "../types/contact";

export const useContact = (pagination?: PaginationParams) => {

 const createContactAsync = useMutation({
   mutationFn: async (creds: CreateContactDTO) => {
     const response = await agent.post("/contact/send", creds);
     return response.data;
   },
 }); 

  const getContactsAsync = useQuery({
    queryKey: ["contacts", pagination?.page, pagination?.pageSize],
    queryFn: async () =>
    await agent.get<Result<PaginatedList<ContactDTO>>>("/contact/all", { params: pagination }).then((res) => res.data),
    enabled: !!pagination,
    staleTime: 5 * 60 * 1000,
  });


  return {
    createContactAsync,
    getContactsAsync
  };
};
