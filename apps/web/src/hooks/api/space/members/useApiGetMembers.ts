import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

type MembersResponse = {
  avatar: string | null;
  id: number;
  isLeader: boolean;
  name: string;
};

export const useApiGetMemers = (spaceId: number) => {
  const getMembers = async (spaceId: number) => {
    const res = await api.get<MembersResponse[]>(`/api/space/members/${spaceId}`);
    return res.data;
  };

  return useQuery({
    queryKey: ["getMembers", spaceId],
    queryFn: () => getMembers(spaceId),
  });
};
