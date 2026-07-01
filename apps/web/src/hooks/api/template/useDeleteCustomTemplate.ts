import { templateQueryKeys } from "@/hooks/api/template/queryKeys";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { CustomTemplateListRes } from "@/types/template";

type DeleteCustomTemplateReq = { formId: number };

export const useDeleteCustomTemplate = (spaceId: number) => {
  const deleteCustomTemplate = async ({ formId }: DeleteCustomTemplateReq) => {
    const { data } = await api.delete<DeleteCustomTemplateReq>(`/form/${formId}`);
    return data;
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomTemplate,
    onMutate: async (newTemplate) => {
      await queryClient.cancelQueries({ queryKey: templateQueryKeys.customList(spaceId) });
      const prevList = queryClient.getQueryData(templateQueryKeys.customList(spaceId));
      queryClient.setQueryData(templateQueryKeys.customList(spaceId), (old: InfiniteData<CustomTemplateListRes["customTemplateList"]>) => {
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            content: page.content.filter((item) => item.id !== newTemplate.formId),
          })),
        };
      });
      return { prevList, newTemplate };
    },
    onError: (error, _, context) => {
      console.error("mutate error with", error);
      queryClient.setQueryData(templateQueryKeys.customList(spaceId), context?.prevList);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: templateQueryKeys.customList(spaceId) });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: templateQueryKeys.customList(spaceId),
      });
    },
  });
};
