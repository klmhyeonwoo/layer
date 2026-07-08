import { actionItemQueryKeys } from "@/hooks/api/actionItem/queryKeys";
import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { ActionItemType } from "@/types/actionItem";

type RecentActionItemList = {
  teamActionItemList: ActionItemType[];
};

const getRecentTeamActionItemList = async (spaceId: number | undefined) => {
  const response = await api.get<RecentActionItemList>(`/api/action-item/space/${spaceId}/recent`);
  return response.data;
};

export const useAPiOptionsRecentTeamActionList = (
  spaceId?: number,
): UseQueryOptions<RecentActionItemList, Error, RecentActionItemList, ReturnType<typeof actionItemQueryKeys.recentTeam>> => ({
  queryKey: actionItemQueryKeys.recentTeam(spaceId),
  queryFn: () => getRecentTeamActionItemList(spaceId),
  select(data) {
    return data;
  },
  enabled: !!spaceId,
});
