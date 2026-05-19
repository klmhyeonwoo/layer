import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

export const useApiKickMember = (spaceId: number) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const apiKickMember = async ({ spaceId, memberId }: { spaceId: number; memberId: number }) => {
    const response = await api.patch(`/api/space/kick`, { spaceId, memberId });
    return response;
  };

  return useMutation({
    mutationFn: (deleteValue: { spaceId: number; memberId: number }) => apiKickMember(deleteValue),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMembers", spaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["getSpaceInfo", spaceId],
      });
      toast.success("해당 팀원을 추방시켰습니다.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
