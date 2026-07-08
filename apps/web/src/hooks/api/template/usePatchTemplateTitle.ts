import { templateQueryKeys } from "@/hooks/api/template/queryKeys";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { CustomTemplateListRes } from "@/types/template";

type PatchTemplateTitle = { formTitle: string; formId: number };

export const usePatchTemplateTitle = (spaceId: number) => {
  const patchTemplateTitle = async ({ formTitle, formId }: PatchTemplateTitle) => {
    const res = await api.patch(`/form/${formId}/title`, { formTitle });
    return res;
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTemplateTitle,
    onMutate: async (newTemplate) => {
      await queryClient.cancelQueries({ queryKey: templateQueryKeys.customList(spaceId) });
      const prevList = queryClient.getQueryData(templateQueryKeys.customList(spaceId));
      queryClient.setQueryData(templateQueryKeys.customList(spaceId), (old: InfiniteData<CustomTemplateListRes["customTemplateList"]>) => {
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            content: page.content.map((item) => (item.id === newTemplate.formId ? { ...item, title: newTemplate.formTitle } : item)),
          })),
        };
      });
      console.log("mutate called with", newTemplate);
      return { prevList, newTemplate };
    },
    onError: (error, _, context) => {
      console.error("mutate error with", error);
      queryClient.setQueryData(templateQueryKeys.customList(spaceId), context?.prevList);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: templateQueryKeys.customList(spaceId) });
    },
  });
};
