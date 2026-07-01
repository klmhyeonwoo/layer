import { spaceQueryKeys } from "@/hooks/api/space/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

export const useChangeLeader = (spaceId: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const changeLeader = async ({ spaceId, memberId }: { spaceId: number; memberId: number }) => {
    const res = await api.patch(`/api/space/change-leader`, {
      spaceId,
      memberId,
    });
    return res;
  };

  return useMutation({
    mutationFn: (changeValue: { spaceId: number; memberId: number }) => changeLeader(changeValue),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: spaceQueryKeys.members(spaceId),
      });
      toast.success("대표자가 변경되었습니다.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
