import { spaceQueryKeys } from "@/hooks/api/space/queryKeys";
import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { Space } from "@/types/spaceType";

const spaceInfoFetch = async (spaceId: number | undefined) => {
  const response = await api.get<Space>(`/api/space/${spaceId}`);
  return response.data;
};

export const useApiOptionsGetSpaceInfo = (spaceId?: number): UseQueryOptions<Space, Error, Space, ReturnType<typeof spaceQueryKeys.info>> => ({
  queryKey: spaceQueryKeys.info(spaceId),
  queryFn: () => spaceInfoFetch(spaceId),
  enabled: !!spaceId,
});
