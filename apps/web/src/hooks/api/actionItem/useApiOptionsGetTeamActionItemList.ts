import { actionItemQueryKeys } from "@/hooks/api/actionItem/queryKeys";
import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { TeamActionItemType } from "@/types/actionItem";

const getTeamActionItemList = async (spaceId: number | undefined) => {
  const response = await api.get<TeamActionItemType>(`/api/action-item/space/${spaceId}`);
  return response.data;
};

export const useApiOptionsGetTeamActionItemList = (
  spaceId?: number,
): UseQueryOptions<TeamActionItemType, Error, TeamActionItemType, ReturnType<typeof actionItemQueryKeys.team>> => ({
  queryKey: actionItemQueryKeys.team(spaceId),
  queryFn: () => getTeamActionItemList(spaceId),
  select(data) {
    return data;
  },
  enabled: !!spaceId,
});
